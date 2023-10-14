const pool = require('./db');
class Student {
    constructor(id, name, birthday, gender) {
        this.id = id;
        this.name = name;
        this.birthday = birthday;
        this.gender = gender;
    }

    buildLimit = (page = null, item_per_page = null) => {
        let limit = '';
        if (page && item_per_page) {
            const row_index = (page - 1) * item_per_page;
            limit = `LIMIT ${row_index}, ${item_per_page}`;
        }
        return limit;
    }

    all = async (page = null, item_per_page = null) => {

        // xây dựng phân trang
        const limit = this.buildLimit(page, item_per_page);
        // query database
        const [rows, fields] = await pool.execute(`SELECT * FROM student ${limit}`);
         // SELECT * FROM student LIMIT 0, 4
        const students = rows.map(row => this.convertToObject(row));
        return students;
    }

    getByPattern = async (pattern, page = null, item_per_page = null) => {

        // xây dựng phân trang
        const limit = this.buildLimit(page, item_per_page);
        // query database
        const [rows, fields] = await pool.execute(`SELECT * FROM student WHERE name LIKE ?  ${limit}`, [`%${pattern}%`]);
        // SELECT * FROM student WHERE name LIKE '%ty%' LIMIT 0, 4
        const students = rows.map(row => this.convertToObject(row));
        return students;
    }

    save = async (data) => {
        const [result] = await pool.execute('INSERT INTO student VALUE(?,?,?,?)', [null, data.name, data.birthday, data.gender]);
        // INSERT INTO student VALUE(null, 'Ty', '2000-01-17', 'name');
        // insertId là mã tự động tăng của database
        return result.insertId;
    }

    // Chuyển 1 dòng dữ liệu thô thành 1 đối tượng student
    convertToObject = (row) => {
        return new Student(row.id, row.name, row.birthday, row.gender);
    }

    // Trả về 1 đối tượng Student dựa vào mã sinh viên
    find = async (id) => {
        const [rows] = await pool.execute(`SELECT * FROM student WHERE id=?`, [id]);
        if (rows.length == 0) {
            // không tìm được dòng nào hết.
            return null;
        }
        // lấy row đầu tiên ra. 
        // rows chỉ chứa 1 dòng thôi vì đang tìm theo id, mà id là duy nhất, không bị trùng
        const row = rows[0];
        const student = this.convertToObject(row);
        return student;
    }

    update = async () => {
        await pool.execute('UPDATE student SET name=?, birthday=?, gender=? WHERE id=?', [this.name, this.birthday, this.gender, this.id]);
        // UPDATE student SET name='Tý', birthday='2000-01-11', gender='nữ' WHERE id=3
        return true;
    }

    destroy = async () => {
        await pool.execute('DELETE FROM student WHERE id=?', [this.id]);
        // DELETE FROM student WHERE id=3
        return true;
    }
}

module.exports = new Student();

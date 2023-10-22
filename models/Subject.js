const pool = require('./db');
class Subject {
    constructor(id, name, number_of_credit) {
        this.id = id;
        this.name = name;
        this.number_of_credit = number_of_credit;
    }

    buildLimit = (page = null, item_per_page = null) => {
        let limit = '';
        if (page && item_per_page) {
            const row_index = (page - 1) * item_per_page;
            limit = `LIMIT ${row_index}, ${item_per_page}`;
            // Trang 1: LIMIT 0, 4
            // Trang 2: LIMIT 4, 4
            // Trang 3: LIMIT 8, 4
        }
        return limit;
    }

    all = async (page = null, item_per_page = null) => {

        // xây dựng phân trang
        const limit = this.buildLimit(page, item_per_page);
        // query database
        const [rows, fields] = await pool.execute(`SELECT * FROM subject ${limit}`);
         // SELECT * FROM subject LIMIT 0, 4
        const subjects = rows.map(row => this.convertToObject(row));
        return subjects;
    }

    getByPattern = async (pattern, page = null, item_per_page = null) => {

        // xây dựng phân trang
        const limit = this.buildLimit(page, item_per_page);
        // query database
        const [rows, fields] = await pool.execute(`SELECT * FROM subject WHERE name LIKE ?  ${limit}`, [`%${pattern}%`]);
        // SELECT * FROM subject WHERE name LIKE '%ty%' LIMIT 0, 4
        const subjects = rows.map(row => this.convertToObject(row));
        return subjects;
    }

    save = async (data) => {
        const [result] = await pool.execute('INSERT INTO subject VALUE(?,?,?)', [null, data.name, data.number_of_credit]);
        // INSERT INTO subject VALUE(null, 'Ty', '2000-01-17', 'name');
        // insertId là mã tự động tăng của database
        return result.insertId;
    }

    // Chuyển 1 dòng dữ liệu thô thành 1 đối tượng subject
    convertToObject = (row) => {
        return new Subject(row.id, row.name, row.number_of_credit);
    }

    // Trả về 1 đối tượng Subject dựa vào mã môn học
    find = async (id) => {
        const [rows] = await pool.execute(`SELECT * FROM subject WHERE id=?`, [id]);
        if (rows.length == 0) {
            // không tìm được dòng nào hết.
            return null;
        }
        // lấy row đầu tiên ra. 
        // rows chỉ chứa 1 dòng thôi vì đang tìm theo id, mà id là duy nhất, không bị trùng
        const row = rows[0];
        const subject = this.convertToObject(row);
        return subject;
    }

    update = async () => {
        await pool.execute('UPDATE subject SET name=?, number_of_credit=? WHERE id=?', [this.name, this.number_of_credit, this.id]);
        // UPDATE subject SET name='Tý', number_of_credit='2000-01-11' WHERE id=3
        return true;
    }

    destroy = async () => {
        await pool.execute('DELETE FROM subject WHERE id=?', [this.id]);
        // DELETE FROM subject WHERE id=3
        return true;
    }
}

module.exports = new Subject();
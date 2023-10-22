const pool = require('./db');
class Register {
    constructor(id, student_id, subject_id, score, student_name, subject_name) {
        this.id = id;
        this.student_id = student_id;
        this.subject_id = subject_id;
        this.score = score;
        this.student_name = student_name;
        this.subject_name = subject_name;
    }

    SELECT_ALL_QUERY = `
    SELECT register.*, student.name AS student_name, subject.name AS subject_name 
    FROM register
    JOIN student ON student.id=register.student_id
    JOIN subject ON subject.id=register.subject_id`;
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
        const [rows, fields] = await pool.execute(`${this.SELECT_ALL_QUERY} ${limit}`);
        // SELECT * FROM register LIMIT 0, 4
        const registers = rows.map(row => this.convertToObject(row));
        return registers;
    }

    getByPattern = async (pattern, page = null, item_per_page = null) => {

        // xây dựng phân trang
        const limit = this.buildLimit(page, item_per_page);
        // query database
        const [rows, fields] = await pool.execute(`${this.SELECT_ALL_QUERY} WHERE student.name LIKE ? OR subject.name LIKE ? ${limit}`, [`%${pattern}%`, `%${pattern}%`]);
        // SELECT * FROM register WHERE student_id LIKE '%ty%' LIMIT 0, 4
        const registers = rows.map(row => this.convertToObject(row));
        return registers;
    }

    save = async (data) => {
        const [result] = await pool.execute('INSERT INTO register VALUE(?,?,?,?)', [null, data.student_id, data.subject_id, null]);
        // INSERT INTO register VALUE(null, 'Ty', '2000-01-17', 'student_id');
        // insertId là mã tự động tăng của database
        return result.insertId;
    }

    // Chuyển 1 dòng dữ liệu thô thành 1 đối tượng register
    convertToObject = (row) => {
        return new Register(row.id, row.student_id, row.subject_id, row.score ? row.score.toFixed(2) : null, row.student_name, row.subject_name);
    }

    // Trả về 1 đối tượng Register dựa vào mã đăng ký môn học
    find = async (id) => {
        const [rows] = await pool.execute(`${this.SELECT_ALL_QUERY} WHERE register.id=?`, [id]);
        if (rows.length == 0) {
            // không tìm được dòng nào hết.
            return null;
        }
        // lấy row đầu tiên ra. 
        // rows chỉ chứa 1 dòng thôi vì đang tìm theo id, mà id là duy nhất, không bị trùng
        const row = rows[0];
        const register = this.convertToObject(row);
        return register;
    }

    update = async () => {
        await pool.execute('UPDATE register SET score=? WHERE id=?', [this.score, this.id]);
        return true;
    }

    destroy = async () => {
        await pool.execute('DELETE FROM register WHERE id=?', [this.id]);
        // DELETE FROM register WHERE id=3
        return true;
    }

    getByStudentId = async (student_id, page = null, item_per_page = null) => {

        // xây dựng phân trang
        const limit = this.buildLimit(page, item_per_page);
        // query database
        const [rows, fields] = await pool.execute(`${this.SELECT_ALL_QUERY} WHERE student_id = ? ${limit}`, [student_id]);
        const registers = rows.map(row => this.convertToObject(row));
        return registers;
    }
}

module.exports = new Register();
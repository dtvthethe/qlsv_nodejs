const pool = require('./db');

class Student {
    constructor(id, name, birthday, gender) {
        this.id = id;
        this.name = name;
        this.birthday = birthday;
        this.gender = gender;
    }

    all = async () => {
        const [rows, fields] = await pool.execute('select * from student');
        // pool.end(); // Ko cần end
        const students = rows.map(row => this.convertToObject(row));
        return students;
    }

    save = async (data) => {
        const [result] = await pool.execute('INSERT INTO student VALUE (?, ?, ?, ?)', [
            null,
            data.name,
            data.birthday,
            data.gender
        ]);

        return result.insertId
    }

    convertToObject = (row) => {
        return new Student(row.id, row.name, row.birthday, row.gender);
    }
}

module.exports = new Student();

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

        return result.insertId;
    }

    find = async (id) => {
        const [rows] = await pool.execute('select * from student where id = ?', [
            id
        ]);

        if (rows.length == 0) {
            return null;
        }

        const row = rows[0];
        const student = this.convertToObject(row);

        return student;
    }

    update = async () => {
        const [result] = await pool.execute('UPDATE student SET name=?, birthday=?, gender=? WHERE id=?', [
            this.name,
            this.birthday,
            this.gender,
            this.id
        ]);

        return true;
    }

    destroy = async () => {
        const [result] = await pool.execute('DELETE FROM student WHERE id=?', [
            this.id
        ]);

        return true;
    }

    convertToObject = (row) => {
        return new Student(row.id, row.name, row.birthday, row.gender);
    }
}

module.exports = new Student();

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

        return rows;
    }
}

module.exports = Student;

const studentModel = require('../models/Student');

class StudentController {
    static index = async (req, res) => {
        const student = new studentModel();
        const rows = await student.all();
        console.log(rows);

        res.render('student/index', {
            rows: rows
        });
    }
}

module.exports = StudentController;

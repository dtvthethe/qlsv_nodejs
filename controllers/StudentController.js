const studentModel = require('../models/Student');

class StudentController {
    static index = async (req, res) => {
        try {
            const students = await studentModel.all();

            res.render('student/index', {
                students: students
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    }

    static create = (req, res) => {
        try {
            res.render('student/create');
        } catch (error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    }

    static store = async (req, res) => {
        try {
            const result = await studentModel.save(req.body);

            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    }
}

module.exports = StudentController;

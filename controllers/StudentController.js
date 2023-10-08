const studentModel = require('../models/Student');

class StudentController {
    static index = async (req, res) => {
        try {
            const students = await studentModel.all();
            const msg_success = req.session.message_success;
            delete req.session.message_success;
            res.render('student/index', {
                students: students,
                msg_success: msg_success
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
            await studentModel.save(req.body);
            req.session.message_success = `Thêm sinh viên "${req.body.name}" thành công`;

            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    }

    static edit = async (req, res) => {
        try {
            const id = req.params.id;
            const student = await studentModel.find(id);

            res.render('student/edit', {
                student:student
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    }

    static update = async (req, res) => {
        try {
            const id = req.body.id;
            const name = req.body.name;
            const birthday = req.body.birthday;
            const gender = req.body.gender;

            const student = await studentModel.find(id);
            student.name = name;
            student.birthday = birthday;
            student.gender = gender;

            await student.update();
            req.session.message_success = `Update sinh viên "${student.name}" thành công`;

            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    }

    static destroy = async (req, res) => {
        try {
            const id = req.params.id;
            const student = await studentModel.find(id);
            await student.destroy();
            req.session.message_success = `Delete sinh viên "${student.name}" thành công`;

            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    }
}

module.exports = StudentController;

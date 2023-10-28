const registerModel = require('../models/Register');
const studentModel = require('../models/Student');
const subjectModel = require('../models/Subject');
class RegisterController {
    // Hiển thị danh sách đăng ký môn học
    static index = async (req, res) => {
        // trycatch
        try {
            const search = req.query.search;
            // Number là hàm chuyển chuỗi thành số
            const page = Number(req.query.page || 1);
            const item_per_page = Number(process.env.ITEM_PER_PAGE);
            let registers;
            let totalRegisters;
            if (search) {
                totalRegisters = await registerModel.getByPattern(search);
                registers = await registerModel.getByPattern(search, page, item_per_page);
            }
            else {
                totalRegisters = await registerModel.all();
                registers = await registerModel.all(page, item_per_page);
            }
            const totalPage = Math.ceil(totalRegisters.length / item_per_page);
            const message_success = req.session.message_success;
            // xóa thuộc tính có tên là message_success
            delete req.session.message_success;
            res.render('register/index', {
                registers: registers,
                message_success: message_success,
                search: search,
                totalPage: totalPage,
                page: page,
                module_name: 'register'
            });

        } catch (error) {
            // 500 là lỗi internal server (lỗi xãy ra ở server)
            console.log(error);//dành cho dev xem
            res.status(500).send(error.message);//cho người dùng xem
        }

    }

    // Hiển thị form thêm đăng ký môn học
    static create = async (req, res) => {
        // trycatch
        try {
            // lấy danh sách sinh viên
            const students = await studentModel.all();

            // lấy danh sách môn học
            const subjects = await subjectModel.all();

            res.render('register/create', {
                module_name: 'register',
                students: students,
                subjects: subjects
            });
        } catch (error) {
            // 500 là lỗi internal server (lỗi xãy ra ở server)
            console.log(error);//dành cho dev xem
            res.status(500).send(error.message);//cho người dùng xem
        }

    }

    static store = async (req, res) => {
        // trycatch
        try {
            // await or not => await 
            await registerModel.save(req.body);

            // Dựa vào student_id để lấy student_name
            const student_id = req.body.student_id;
            const student = await studentModel.find(student_id);
            const student_name = student.name;

            // Dựa vào subject_id để lấy subject_name
            const subject_id = req.body.subject_id;
            const subject = await subjectModel.find(subject_id);
            const subject_name = subject.name;

            // lưu thông báo vào session
            // req.session là đối tượng tự có khi truy cập ở controller
            req.session.message_success = `Sinh viên ${student_name} đăng ký môn ${subject_name} thành công`;

            // Điều hướng về trang danh sách đăng ký môn học
            res.redirect('/register');
            // res.send('con gà');
        } catch (error) {
            // 500 là lỗi internal server (lỗi xãy ra ở server)
            console.log(error);//dành cho dev xem
            res.status(500).send(error.message);//cho người dùng xem
        }

    }

    // Hiển thị form chỉnh sửa đăng ký môn học
    static edit = async (req, res) => {
        // trycatch
        try {
            // lấy tham số ở route thông qua params
            const id = req.params.id;
            const register = await registerModel.find(id);
            res.render('register/edit', { register: register, module_name: 'register' });
        } catch (error) {
            // 500 là lỗi internal server (lỗi xãy ra ở server)
            console.log(error);//dành cho dev xem
            res.status(500).send(error.message);//cho người dùng xem
        }

    }

    static update = async (req, res) => {
        // trycatch
        try {
            // từ trình duyệt web gởi lên thông qua form post
            const id = req.body.id;
            const score = req.body.score;

            // Tìm đăng ký môn học tương ứng trong database
            const register = await registerModel.find(id);

            // Cập nhật dữ liệu cho đối tượng register 
            register.score = score;

            // update object này xuống database
            await register.update();
            // lưu thông báo vào session
            // req.session là đối tượng tự có khi truy cập ở controller
            req.session.message_success = `Sinh viên ${register.student_name} thi môn ${register.subject_name} được ${score} điểm`;

            // Điều hướng về trang danh sách đăng ký môn học
            res.redirect('/register');
            // res.send('con gà');
        } catch (error) {
            // 500 là lỗi internal server (lỗi xãy ra ở server)
            console.log(error);//dành cho dev xem
            res.status(500).send(error.message);//cho người dùng xem
        }

    }

    static destroy = async (req, res) => {
        // trycatch
        try {
            const id = req.params.id;

            // Lấy đăng ký môn học từ database lên
            const register = await registerModel.find(id);

            // Xóa đăng ký môn học này trong database
            await register.destroy();

            // lưu thông báo vào session
            // req.session là đối tượng tự có khi truy cập ở controller
            req.session.message_success = `Sinh viên ${register.student_name} hủy môn học ${register.subject_name} thành công`;

            // Điều hướng về trang danh sách đăng ký môn học
            res.redirect('/register');
            // res.send('con gà');
        } catch (error) {
            // 500 là lỗi internal server (lỗi xãy ra ở server)
            console.log(error);//dành cho dev xem
            res.status(500).send(error.message);//cho người dùng xem
        }

    }
}

module.exports = RegisterController;

const studentModel = require('../models/Student');
class StudentController {
    // Hiển thị danh sách sinh viên
    static index = async (req, res) => {
        // trycatch
        try {
            const search = req.query.search;
            // Number là hàm chuyển chuỗi thành số
            const page = Number(req.query.page || 1);
            const item_per_page = Number(process.env.ITEM_PER_PAGE);
            let students;
            let totalStudents;
            if (search) {
                totalStudents = await studentModel.getByPattern(search);
                students = await studentModel.getByPattern(search, page, item_per_page);
            }
            else {
                totalStudents = await studentModel.all();
                students = await studentModel.all(page, item_per_page);
            }
            const totalPage = Math.ceil(totalStudents.length / item_per_page);
            const message_success = req.session.message_success;
            // xóa thuộc tính có tên là message_success
            delete req.session.message_success;
            res.render('student/index', {
                students: students, 
                message_success: message_success,
                search:search,
                totalPage: totalPage,
                page: page,
            });

        } catch (error) {
            // 500 là lỗi internal server (lỗi xãy ra ở server)
            console.log(error);//dành cho dev xem
            res.status(500).send(error.message);//cho người dùng xem
        }

    }

    // Hiển thị form thêm sinh viên
    static create = (req, res) => {
        // trycatch
        try {
            res.render('student/create', {});
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
            await studentModel.save(req.body);
            // lưu thông báo vào session
            // req.session là đối tượng tự có khi truy cập ở controller
            req.session.message_success = `Đã thêm sinh viên ${req.body.name} thành công`;

            // Điều hướng về trang danh sách sinh viên
            res.redirect('/');
            // res.send('con gà');
        } catch (error) {
            // 500 là lỗi internal server (lỗi xãy ra ở server)
            console.log(error);//dành cho dev xem
            res.status(500).send(error.message);//cho người dùng xem
        }

    }

    // Hiển thị form chỉnh sửa sinh viên
    static edit = async (req, res) => {
        // trycatch
        try {
            // lấy tham số ở route thông qua params
            const id = req.params.id;
            const student = await studentModel.find(id);
            res.render('student/edit', { student: student });
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
            const name = req.body.name;
            const birthday = req.body.birthday;
            const gender = req.body.gender;

            // Tìm sinh viên tương ứng trong database
            const student = await studentModel.find(id);

            // Cập nhật dữ liệu cho đối tượng student 
            student.name = name;
            student.birthday = birthday;
            student.gender = gender;

            // update object này xuống database
            await student.update();
            // lưu thông báo vào session
            // req.session là đối tượng tự có khi truy cập ở controller
            req.session.message_success = `Đã cập nhật sinh viên ${req.body.name} thành công`;

            // Điều hướng về trang danh sách sinh viên
            res.redirect('/');
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

            // Lấy sinh viên từ database lên
            const student = await studentModel.find(id);

            // Xóa sinh viên này trong database
            await student.destroy();

            // lưu thông báo vào session
            // req.session là đối tượng tự có khi truy cập ở controller
            req.session.message_success = `Đã xóa sinh viên ${student.name} thành công`;

            // Điều hướng về trang danh sách sinh viên
            res.redirect('/');
            // res.send('con gà');
        } catch (error) {
            // 500 là lỗi internal server (lỗi xãy ra ở server)
            console.log(error);//dành cho dev xem
            res.status(500).send(error.message);//cho người dùng xem
        }

    }
}

module.exports = StudentController;

const subjectModel = require('../models/Subject');
class SubjectController {
    // Hiển thị danh sách môn học
    static index = async (req, res) => {
        // trycatch
        try {
            const search = req.query.search;
            // Number là hàm chuyển chuỗi thành số
            const page = Number(req.query.page || 1);
            const item_per_page = Number(process.env.ITEM_PER_PAGE);
            console.log(page, item_per_page);
            let subjects;
            let totalSubjects;
            if (search) {
                totalSubjects = await subjectModel.getByPattern(search);
                subjects = await subjectModel.getByPattern(search, page, item_per_page);
            }
            else {
                totalSubjects = await subjectModel.all();
                subjects = await subjectModel.all(page, item_per_page);
            }
            const totalPage = Math.ceil(totalSubjects.length / item_per_page);
            const message_success = req.session.message_success;
            // xóa thuộc tính có tên là message_success
            delete req.session.message_success;
            res.render('subject/index', {
                subjects: subjects, 
                message_success: message_success,
                search:search,
                totalPage: totalPage,
                page: page,
                module_name: 'subject'
            });

        } catch (error) {
            // 500 là lỗi internal server (lỗi xãy ra ở server)
            console.log(error);//dành cho dev xem
            res.status(500).send(error.message);//cho người dùng xem
        }

    }

    // Hiển thị form thêm môn học
    static create = (req, res) => {
        // trycatch
        try {
            res.render('subject/create', {module_name: 'subject'});
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
            await subjectModel.save(req.body);
            // lưu thông báo vào session
            // req.session là đối tượng tự có khi truy cập ở controller
            req.session.message_success = `Đã thêm môn học ${req.body.name} thành công`;

            // Điều hướng về trang danh sách môn học
            res.redirect('/subject');
            // res.send('con gà');
        } catch (error) {
            // 500 là lỗi internal server (lỗi xãy ra ở server)
            console.log(error);//dành cho dev xem
            res.status(500).send(error.message);//cho người dùng xem
        }

    }

    // Hiển thị form chỉnh sửa môn học
    static edit = async (req, res) => {
        // trycatch
        try {
            // lấy tham số ở route thông qua params
            const id = req.params.id;
            const subject = await subjectModel.find(id);
            res.render('subject/edit', { subject: subject,module_name: 'subject' });
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
            const number_of_credit = req.body.number_of_credit;

            // Tìm môn học tương ứng trong database
            const subject = await subjectModel.find(id);

            // Cập nhật dữ liệu cho đối tượng subject 
            subject.name = name;
            subject.number_of_credit = number_of_credit;

            // update object này xuống database
            await subject.update();
            // lưu thông báo vào session
            // req.session là đối tượng tự có khi truy cập ở controller
            req.session.message_success = `Đã cập nhật môn học ${req.body.name} thành công`;

            // Điều hướng về trang danh sách môn học
            res.redirect('/subject');
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

            // Lấy môn học từ database lên
            const subject = await subjectModel.find(id);

            // Xóa môn học này trong database
            await subject.destroy();

            // lưu thông báo vào session
            // req.session là đối tượng tự có khi truy cập ở controller
            req.session.message_success = `Đã xóa môn học ${subject.name} thành công`;

            // Điều hướng về trang danh sách môn học
            res.redirect('/subject');
            // res.send('con gà');
        } catch (error) {
            // 500 là lỗi internal server (lỗi xãy ra ở server)
            console.log(error);//dành cho dev xem
            res.status(500).send(error.message);//cho người dùng xem
        }

    }
}

module.exports = SubjectController;
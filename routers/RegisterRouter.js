const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController');

// Hiển thị danh sách đăng ký môn học
// qlsv.com/subject
router.get('/', RegisterController.index);

// Hiển thị form thêm đăng ký môn học
// qlsv.com/subject/create
router.get('/create', RegisterController.create);

// Lưu đăng ký môn học xuống cơ sở dữ liệu
router.post('/store', RegisterController.store);

// Hiển thị form chỉnh sửa đăng ký môn học
router.get('/edit/:id', RegisterController.edit);

// Cập nhật đăng ký môn học xuống cơ sở dữ liệu
router.post('/update', RegisterController.update);

// Xóa đăng ký môn học này trong database
router.get('/destroy/:id', RegisterController.destroy);

module.exports = router;

const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/StudentController');

// Hiển thị danh sách sinh viên
router.get('/', StudentController.index);

// Hiển thị form thêm sinh viên
router.get('/create', StudentController.create);

// Lưu sinh viên xuống cơ sở dữ liệu
router.post('/store', StudentController.store);

// Hiển thị form chỉnh sửa sinh viên
router.get('/edit/:id', StudentController.edit);

// Cập nhật sinh viên xuống cơ sở dữ liệu
router.post('/update', StudentController.update);

// Xóa sinh viên này trong database
router.get('/destroy/:id', StudentController.destroy);

module.exports = router;

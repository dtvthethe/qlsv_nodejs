const express = require('express');
const router = express.Router();
const SubjectController = require('../controllers/SubjectController');

// Hiển thị danh sách môn học
// qlsv.com/subject
router.get('/', SubjectController.index);

// Hiển thị form thêm môn học
// qlsv.com/subject/create
router.get('/create', SubjectController.create);

// Lưu môn học xuống cơ sở dữ liệu
router.post('/store', SubjectController.store);

// Hiển thị form chỉnh sửa môn học
router.get('/edit/:id', SubjectController.edit);

// Cập nhật môn học xuống cơ sở dữ liệu
router.post('/update', SubjectController.update);

// Xóa môn học này trong database
router.get('/destroy/:id', SubjectController.destroy);

module.exports = router;

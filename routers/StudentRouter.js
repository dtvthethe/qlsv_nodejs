const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/StudentController');

// Student List
router.get('/', StudentController.index);
router.get('/create', StudentController.create);
router.post('/store', StudentController.store);
router.get('/edit/:id', StudentController.edit);
router.post('/update', StudentController.update);
router.get('/destroy/:id', StudentController.destroy);

module.exports = router;

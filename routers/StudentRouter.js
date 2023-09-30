const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/StudentController');

// Student List
router.get('/', StudentController.index);

module.exports = router;

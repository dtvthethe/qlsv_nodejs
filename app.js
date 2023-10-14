const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
// xử lý file .env
require('dotenv').config()
// xử lý post data
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// xử lý session
var session = require('express-session');

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

const path = require('path');

const hostname = '127.0.0.1';
const port = 8081;

// cấu hình hệ thống sử dụng engine view nào?
// set dịch là thiết lập
// view engine là buộc phải viết y chang
app.set('view engine', 'ejs');

// chỉ định view (template) nằm ở đâu
// 2 tham số: tham số 1 là từ khóa views (không đổi)
// tham số thứ 2 là đường dẫn đến thư mục chứa template
app.set('views', './views')

// chỉ định các file trong thư mục public (file tĩnh)
// __dirname là đường dẫn chứa thu mục của file đang chạy, cụ thể là:
// D:\Teach\NodeJs\K98\qlsv

// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'con gà đang ăn thóc',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

const studentRouter = require('./routers/StudentRouter');
app.use('/', studentRouter);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

require('dotenv').config();
const mysql = require('mysql2/promise');

// TODO: khi nao cai nay chay
// Pool là 1 cái hồ trong đó sẽ lau lại 1 cái connect có thể dùng lại cho lần sau mà ko phải khởi tạo lại
// dùng lại đc nhiều lần
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PWD
});

module.exports = pool;

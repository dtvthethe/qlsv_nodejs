const mysql = require('mysql2/promise');
// xử lý file .env
require('dotenv').config()
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: ['DATE', 'DATETIME', 'TIMESTAMP']
});

module.exports = pool;
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mysql = require('mysql2/promise');
require('dotenv').config();
const app = express();
app.use(expressLayouts);

const hostname = '127.0.0.1';
const port = 8080;

// define: 'view engine':
app.set('view engine', 'ejs');
// define view folder:
app.set('views', './views');

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PWD
});

// route
app.get('/', async function (req, res) {
    // query database
    const [rows, fields] = await pool.execute('select * from student');
    pool.end();
    res.render('index', {
        a1: 'con bò',
        a2: 'con cá',
        app_name: process.env.APP_NAME,
        rows: rows
    });
})
// route
app.get('/san-pham.html', function (req, res) {
    res.render('product', {
        app_name: process.env.APP_NAME
    });
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

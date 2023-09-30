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


// DATABASE_URL=mysql://root:Aa@123456@localhost/dev_mrmax?serverVersion=5.7
// DATABASE_SLAVE1_URL=mysql://root:Aa@123456@localhost/dev_mrmax?serverVersion=5.7



// route
app.get('/', async function (req, res) {

    // "await" wait for connect done
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'qlsv_k98', password: 'Aa@123456'});
    // query database
    const [rows, fields] = await connection.execute('select * from student');
    console.log(rows);

    res.render('index', {
        a1: 'con bò',
        a2: 'con cá',
        app_name: process.env.APP_NAME
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

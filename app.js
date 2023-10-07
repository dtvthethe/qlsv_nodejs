const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

require('dotenv').config();
const app = express();
app.use(expressLayouts);

const hostname = '127.0.0.1';
const port = 8081;

// define: 'view engine':
app.set('view engine', 'ejs');
// define view folder:
app.set('views', './views');

// chỉ định file tĩnh thư mục public
// console.log(__dirname);
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// session
const session = require('express-session');
app.use(session({
    secret: 'qlsv secret key',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}));

// route
const studentRouter = require('./routers/StudentRouter');
app.use('/', studentRouter);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

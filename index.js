const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');

require('dotenv').config({ debug: true });
require('./libs/dbConnect');

// const { engine } = require('express-handlebars');

const userRouter = require('./routes/user.route');

const dashoardRouter = require('./routes/dashboard.route');

const { verifyUser } = require('./libs/middleware');

const app = express();

// Use assets
app.use(express.static('./public'));
// Report detailed logs
app.use(morgan('dev'));
// Middleware to process form data
app.use(express.urlencoded({ extended: false }));
// Session
app.use(
    session({
        secret: process.env.AUTH_SECRET,
        saveUninitialized: true,
        resave: false,
    })
);
// Flash messages (call after session)
app.use(flash());

// Sets view engine
app.set('views', `${__dirname}/views`);

/*
app.engine(
    '.hbs',
    engine({
        extname: 'hbs', // .handlebars
        layoutsDir: path.join(__dirname, 'views/layouts'),
        partialsDir: path.join(__dirname, 'views/partials'),
        defaultLayout: 'main.hbs',
    })
);
*/

app.set('view engine', '.ejs');

// Routes
app.use('/', userRouter);

// Verification middleware
app.use('/dashboard', verifyUser, dashoardRouter);

app.use((request, response) => {
    response.status(404).render('index', { message: 'Page not found', title: 'Lost?' });
});
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

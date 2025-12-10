const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config({ debug: true });
require('./libs/dbConnect');

const { engine } = require('express-handlebars');

const userRouter = require('./routes/user.route');

const app = express();

// Use assets
app.use(express.static('public'));
// Report detailed logs
app.use(morgan('dev'));

// Sets view engine
app.set('views', `${__dirname}/views`);
app.engine(
    '.hbs',
    engine({
        extname: 'hbs', // .handlebars
        layoutsDir: path.join(__dirname, 'views/layouts'),
        partialsDir: path.join(__dirname, 'views/partials'),
        defaultLayout: 'main.hbs',
    })
);
app.set('view engine', '.hbs');

// Routes
app.get('/', (request, response) => {
    response.render('index');
});

// Users
app.use('/users', userRouter);

app.get('/about', (request, response) => {
    response.render('about');
});

app.get('/contact', (request, response) => {
    response.render('contact', { message: 'We will respond in a jiffy' });
});

app.get('/invoice', (request, response) => {
    response.render('invoice');
});

// Catch-all route with middleware-style handler
/*
app.use((request, response) => {
    response.status(404).render('index', { message: 'Page not found' });
});
*/

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

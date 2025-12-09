const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const { engine } = require('express-handlebars');

const app = express();
const port = 3000;

// Connect to mongoose
mongoose.connect('mongodb://localhost/blogit');

// Use assets
app.use(express.static('public'));

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

app.get('/about', (request, response) => {
    response.render('about');
});

app.get('/contact', (request, response) => {
    response.render('contact');
});

app.get('/post', (request, response) => {
    response.render('post');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const { engine } = require('express-handlebars');

const app = express();

// Connect to mongoose
mongoose.connect('mongodb://localhost/invoice_db');

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

app.get('/invoice', (request, response) => {
    response.render('invoice');
});

// Catch-all route with middleware-style handler
app.use((request, response) => {
    response.status(404).send('Page Not Found');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

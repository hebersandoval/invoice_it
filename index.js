const path = require('path');
const express = require('express');

const edgeTempleEngine = require('express-edge');

const app = express();
const port = 3000;

// Use assets
app.use(express.static('public'));

// Sets view engine
app.use(edgeTempleEngine);
app.set('views', `${__dirname}/views`);

// Routes
app.get('/', (request, response) => {
    response.render('index');
});

app.get('/about', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'pages/about.html'));
});

app.get('/contact', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.get('/post', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'pages/post.html'));
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

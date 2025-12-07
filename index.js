const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/about', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'about.html'));
});

app.get('/contact', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'contact.html'));
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

/*
const http = require('http');
const fs = require('fs');

const aboutPage = fs.readFileSync('about.html');
const contactPage = fs.readFileSync('contact.html');
const homePage = fs.readFileSync('index.html');
const pageNotFound = fs.readFileSync('404.html');

// Create server
const server = http.createServer((request, response) => {
    // request - from client (browser) to server
    // response - from server to client
    console.log(request.url);

    if (request.url === '/about') {
        return response.end(aboutPage);
    } else if (request.url === '/contact') {
        return response.end(contactPage);
    } else if (request.url == '/') {
        return response.end(homePage);
    } else {
        response.writeHead(404);

        response.end(pageNotFound);
    }
});

server.listen(3000);
*/

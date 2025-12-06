const http = require('http');
const fs = require('fs');

const aboutPage = fs.readFileSync('about.html');
const contactPage = fs.readFileSync('contact.html');
const homePage = fs.readFileSync('index.html');

// Create server
const server = http.createServer((request, response) => {
    // request - from client (browser) to server
    // response - from server to client
    console.log(request.url);

    if (request.url === '/about') {
        return response.end('About page');
    } else if (request.url === '/contact') {
        return response.end('Contact page');
    } else if (request.url == '/') {
        return response.end('Blog it!');
    } else {
        response.writeHead(404);

        response.end('Page not found');
    }
});

server.listen(3000);

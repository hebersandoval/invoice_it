const express = require('express');

const router = express.Router();

const { getUser, createUser, deleteUser } = require('../controllers/user.controller');

// User routes
router.get('/', (request, response) => {
    response.render('pages/index', { title: 'Invoice it!' });
});

router.get('/login', (request, response) => {
    response.render('pages/login', { title: 'Sign in' });
});

router.get('/signup', (request, response) => {
    response.render('pages/signup', { title: 'Sign up' });
});

module.exports = router;

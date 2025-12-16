const express = require('express');

const router = express.Router();

const { validateSignup, signup } = require('../controllers/user.controller');

// User routes
router.get('/', (request, response) => {
    response.render('pages/index', { title: 'Invoice it!' });
});

router.get('/login', (request, response) => {
    response.render('pages/login', { title: 'Sign in' });
});

router.get('/signup', (request, response) => {
    response.render('pages/signup', {
        title: 'Sign up',
        errors: request.flash('errors'),
        user: request.flash('data')[0],
    });
});

router.post('/signup', validateSignup, signup);

module.exports = router;

const bcrypt = require('bcrypt');

const User = require('../libs/models/user.model');

const { body, validationResult } = require('express-validator');

const validateSignup = [
    body('email', 'Email must not be empty').notEmpty(),
    body('password', 'Password must not be empty').notEmpty(),
    body('password', 'Password must be 6+ characters long').isLength({ min: 6 }),
    body('repeatPassword', 'Repeat password must not be empty').notEmpty(),
    body('repeatPassword', 'Passwords do not match').custom((value, { req }) => value === req.body.password),
];

const validateLogin = [
    body('email', 'Email must not be empty').notEmpty(),
    body('password', 'Password must not be empty').notEmpty(),
];

const signup = async (request, response) => {
    const validationErrors = validationResult(request);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        request.flash('errors', errors);
        request.flash('data', request.body);

        return response.redirect('/signup');
    }

    const { email, password } = request.body;
    const query = { email };

    const existingUser = await User.findOne(query);

    if (existingUser) {
        // Email already exists
        request.flash('data', request.body);
        request.flash('info', {
            message: 'Email is already registered. Try to login instead',
            type: 'error',
        });

        response.redirect('/signup');
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            email,
            password: hashedPassword,
        };

        const result = await User.create(user);
        request.session.userId = result._id;
        // When signup is successful
        request.flash('info', {
            message: 'Signup successful',
            type: 'success',
        });

        response.redirect('/dashboard');
    }
};

const login = async (request, response) => {
    const validationErrors = validationResult(request);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        request.flash('errors', errors);
        request.flash('data', request.body);

        return response.redirect('/login');
    }

    const { email, password } = request.body;
    const user = await User.findOne({ email });

    if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            request.session.userId = user._id;
            request.flash('info', {
                message: 'Login succesful',
                type: 'success',
            });

            response.redirect('/dashboard');
        } else {
            request.flash('info', {
                message: 'Wrong password',
                type: 'error',
            });

            request.flash('data', request.body);
            response.redirect('/login');
        }
    } else {
        request.flash('info', {
            message: 'Email is not registered',
            type: 'error',
        });

        request.flash('data', request.body);
        response.redirect('/login');
    }
};

logout = (request, response) => {
    request.session.userId = null;
    request.flash('info', {
        message: 'Logout successful',
        type: 'success',
    });

    response.redirect('/');
};

module.exports = {
    signup,
    validateSignup,
    login,
    validateLogin,
    logout,
};

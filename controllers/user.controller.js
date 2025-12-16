const User = require('../libs/models/user.model');

const { body, validationResult } = require('express-validator');

const validateSignup = [
    body('email', 'Email must not be empty').notEmpty(),
    body('password', 'Password must not be empty').notEmpty(),
    body('password', 'Password must be 6+ characters long').isLength({ min: 6 }),
    body('repeatPassword', 'Repeat password must not be empty').notEmpty(),
    body('repeatPassword', 'Passwords do not match').custom((value, { request }) => value === request.body.password),
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
        response.redirect('/signup');
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            email,
            password: hashedPassword,
        };

        const result = await User.create(user);
        request.session.userId = result._id;
        response.redirect('/dashboard');
    }
};

module.exports = {
    signup,
    validateSignup,
};

const User = require('../libs/models/user.model');

/*
const createUser = async (request, response) => {
    await User.create({
        email: 'bob@mail.com',
        password: 'secret',
    });

    response.render('user', { message: 'User created', user: null });
};

const getUser = async (request, response) => {
    const user = await User.findOne({ email: 'bob@mail.com' }).lean();

    response.render('user', { message: 'User retrieved', user: user });
};

const deleteUser = async (request, response) => {
    await User.findOneAndDelete({ email: 'bob@mail.com' });

    response.render('user', { message: 'User deleted', user: null });
};
*/

const signup = async (request, response) => {
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
};

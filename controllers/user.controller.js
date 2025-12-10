const User = require('../libs/models/user.model');

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

module.exports = {
    getUser,
    createUser,
    deleteUser,
};

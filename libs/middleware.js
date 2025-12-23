const verifyUser = (request, response, next) => {
    if (!request.session.userId) {
        return response.redirect('/login');
    }

    next();
};

module.exports = {
    verifyUser,
};

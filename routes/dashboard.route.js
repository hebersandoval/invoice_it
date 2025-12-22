const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
    response.render('pages/dashboard', {
        title: 'Dashboard',
        info: request.flash('info')[0],
    });
});

module.exports = router;

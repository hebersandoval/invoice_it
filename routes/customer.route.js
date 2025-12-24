const express = require('express');
const router = express.Router();

const { showCustomers, createCustomer, validateCustomer } = require('../controllers/customer.controller');

router.get('/', showCustomers);

router.get('/create', function (request, response) {
    response.render('pages/customers', {
        title: 'Create customer',
        formAction: 'create',
        type: 'form',
        customer: request.flash('data')[0],
        errors: request.flash('errors'),
    });
});

router.post('/create', validateCustomer, createCustomer);

module.exports = router;

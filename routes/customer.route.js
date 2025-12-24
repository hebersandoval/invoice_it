const express = require('express');
const router = express.Router();

const {
    showCustomers,
    createCustomer,
    editCustomer,
    updateCustomer,
    deleteCustomer,
    validateCustomer,
} = require('../controllers/customer.controller');

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

router.get('/:id/edit', editCustomer);

router.post('/:id/edit', validateCustomer, updateCustomer);

router.post('/:id/delete', deleteCustomer);

module.exports = router;

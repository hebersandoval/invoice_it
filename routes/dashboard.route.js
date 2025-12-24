const express = require('express');

const router = express.Router();

const customersRouter = require('./customer.route');

const invoiceRouter = require('./invoice.route');

router.get('/', (request, response) => {
    response.render('pages/dashboard', {
        title: 'Dashboard',
        info: request.flash('info')[0],
    });
});

// Customer nested under dashboard -> mysite.com/dashboard/customers
router.use('/customers', customersRouter);

// mysite.com/dashboard/invoices
router.use('/invoices', invoiceRouter);

module.exports = router;

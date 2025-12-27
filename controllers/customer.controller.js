const Customer = require('../libs/models/customer.model');
const Invoice = require('../libs/models/invoice.model');

const { body, validationResult } = require('express-validator');

const validateCustomer = [
    body('name', 'Name must not be empty').notEmpty(),
    body('email', 'Email must not be empty').notEmpty(),
    body('phone', 'Phone must not be empty').notEmpty(),
    body('address', 'Address must not be empty').notEmpty(),
];

const showCustomers = async (request, response) => {
    const query = { owner: request.session.userId };

    // Search for customer
    const { search } = request.query;

    if (search) {
        query['$or'] = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
            { address: { $regex: search, $options: 'i' } },
        ];
    }

    const customers = await Customer.find(query);

    response.render('pages/customers', {
        title: 'Customers',
        type: 'data',
        customers,
        info: request.flash('info')[0],
    });
};

const createCustomer = async (request, response) => {
    const validationErrors = validationResult(request);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        request.flash('errors', errors);
        request.flash('data', request.body);

        return response.redirect('create');
    }

    const newCustomer = request.body;
    newCustomer.owner = request.session.userId;

    await Customer.create(newCustomer);

    request.flash('info', {
        message: 'Customer created',
        type: 'success',
    });

    response.redirect('/dashboard/customers');
};

const editCustomer = async (request, response) => {
    const customerId = request.params.id;
    const customer = await Customer.findById(customerId);

    response.render('pages/customers', {
        title: 'Edit customer',
        type: 'form',
        formAction: 'edit',
        customer: request.flash('data')[0] || customer,
        errors: request.flash('errors'),
    });
};

const updateCustomer = async (request, response) => {
    const validationErrors = validationResult(request);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        request.flash('errors', errors);
        request.flash('data', request.body);

        return response.redirect('edit');
    }

    const customerId = request.params.id;
    const customerData = request.body;

    await Customer.findByIdAndUpdate(customerId, customerData);
    request.flash('info', {
        message: 'Customer updated',
        type: 'success',
    });

    response.redirect('/dashboard/customers');
};

const deleteCustomer = async (request, response) => {
    const customerId = request.params.id;

    // Delete invoices by that customer
    await Invoice.deleteMany({ customer: customerId });
    await Customer.findByIdAndDelete(customerId);
    request.flash('info', {
        message: 'Customer deleted',
        type: 'success',
    });

    response.redirect('/dashboard/customers');
};

module.exports = {
    showCustomers,
    createCustomer,
    editCustomer,
    updateCustomer,
    deleteCustomer,
    validateCustomer,
};

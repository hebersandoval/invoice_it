const Customer = require('../libs/models/customer.model');
const Invoice = require('../libs/models/invoice.model');

const { body, validationResult } = require('express-validator');

const validateInvoice = [
    body('customer', 'Select the customer').notEmpty(),
    body('amount', 'Amount must not be empty').notEmpty(),
    body('date', 'Due date must not be empty').notEmpty(),
    body('status', 'Select the status').notEmpty(),
];

// Pull referenced document data; pull the customer name for each invoice we have
const populateInvoices = (query) => {
    return query.populate({
        path: 'customer',
        model: Customer,
        select: '_id name',
    });
};

// Show
const showInvoices = async (request, response) => {
    const query = { owner: request.session.userId };

    const invoices = await populateInvoices(Invoice.find(query));
    response.render('pages/invoices', {
        title: 'Invoices',
        type: 'data',
        invoices,
        info: request.flash('info')[0],
    });
};

// Get the customer data for the invoice form
const getCustomers = async (request, response, next) => {
    const customersQuery = { owner: request.session.userId };
    const customers = await Customer.find(customersQuery);
    // The customers data is attached to the request.customers property, so the next middleware can access it
    request.customers = customers;
    next();
};

const createInvoice = async (request, response) => {
    const validationErrors = validationResult(request);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        request.flash('errors', errors);
        request.flash('data', request.body);

        return response.redirect('create');
    }

    const newInvoice = request.body;
    newInvoice.owner = request.session.userId;

    await Invoice.create(newInvoice);
    request.flash('info', {
        message: 'New invoice created',
        type: 'success',
    });

    response.redirect('/dashboard/invoices');
};

const editInvoice = async (request, response) => {
    const invoiceId = request.params.id;
    const invoice = await populateInvoices(Invoice.findById(invoiceId));
    const { customers } = request;

    response.render('pages/invoices', {
        title: 'Edit invoice',
        type: 'form',
        formAction: 'edit',
        customers,
        invoice: request.flash('data')[0] || invoice,
        errors: request.flash('errors'),
    });
};

const updateInvoice = async (request, response) => {
    const validationErrors = validationResult(request);

    if (!validationErrors.isEmpty) {
        const errors = validationErrors.array();
        request.flash('errors', errors);
        request.flash('data', request.body);

        return response.redirect('edit');
    }

    const invoiceId = request.params.id;
    const data = request.body;

    await Invoice.findByIdAndUpdate(invoiceId, data);
    request.flash('info', {
        message: 'Invoice updated',
        type: 'success',
    });

    response.redirect('/dashboard/invoices');
};

const deleteInvoice = async (request, response) => {
    const invoiceId = request.params.id;

    await Invoice.findByIdAndDelete(invoiceId);
    request.flash('info', {
        message: 'Invoice deleted',
        type: 'success',
    });

    response.redirect('/dashboard/invoices');
};

module.exports = {
    showInvoices,
    createInvoice,
    getCustomers,
    editInvoice,
    updateInvoice,
    deleteInvoice,
    validateInvoice,
};

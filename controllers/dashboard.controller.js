const Customer = require('../libs/models/customer.model');
const Invoice = require('../libs/models/invoice.model');

const { USDollar } = require('../libs/formatter');

const showDashboard = async (request, response) => {
    const query = { owner: request.session.userId };

    // Get total count of invoices and customers
    const invoiceCount = await Invoice.countDocuments(query);
    const customerCount = await Customer.countDocuments(query);

    const allInvoices = await Invoice.find(query).populate({
        path: 'customer',
        model: Customer,
        select: '_id name',
    });

    // Total amount paid
    const totalPaid = allInvoices.reduce((sum, invoice) => {
        return invoice.status === 'paid' ? sum + invoice.amount : sum;
    }, 0);

    // Total amount pending
    const totalPending = allInvoices.reduce((sum, invoice) => {
        return invoice.status === 'pending' ? sum + invoice.amount : sum;
    }, 0);
};

module.exports = {
    showDashboard,
};

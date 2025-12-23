const Customer = require('../libs/models/customer.model');

const { body, validationResult } = require('express-validator');

const validateCustomer = [
    body('name', 'Name must not be empty').notEmpty(),
    body('email', 'Email must not be empty').notEmpty(),
    body('phone', 'Phone must not be empty').notEmpty(),
    body('address', 'Address must not be empty').notEmpty(),
];

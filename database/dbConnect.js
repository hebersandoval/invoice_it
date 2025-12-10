const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is missing');
}

mongoose
    .connect(MONGODB_URI, {
        dbName: 'invoice_db',
        bufferCommands: false,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// console.log('Connected to MongoDB');

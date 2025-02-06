const mongoose = require('mongoose');

const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL);
        console.log('Database Connected');
    } catch (error) {
        console.error('Database connection error:', error);
        // Additional info to help debug
        if (error.name === 'MongoNetworkError') {
            console.error('Network issue or incorrect connection string.');
        }
    }
}

module.exports = ConnectDb;

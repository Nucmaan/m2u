const mongoose = require('mongoose');

const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Database Connected');
    } catch (error) {
        console.error('Database connection error:', error);
         if (error.name === 'MongoNetworkError') {
            console.error('Network issue or incorrect connection string.');
        }
    }
}

module.exports = ConnectDb;

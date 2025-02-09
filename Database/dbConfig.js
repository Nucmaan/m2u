const mongoose = require('mongoose');

const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Database Connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); 
    }
}

module.exports = ConnectDb;

const mongoose = require('mongoose');

const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL)
        console.log('Database Connected');
    } catch (error) {
        console.log(error)
    }
}

module.exports = ConnectDb;
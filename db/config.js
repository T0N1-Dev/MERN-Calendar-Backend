const mongoose = require('mongoose');

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Database online');
    } catch (err) {
        console.log(err);
        throw new Error('Error initializing database.')
    }
}

module.exports = {
    dbConection
}


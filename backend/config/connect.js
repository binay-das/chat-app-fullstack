const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI);
        // console.log(`MongoDB connected: ${conn.connection.host}`);
        console.log(`MongoDB connected`.underline);

    } catch (err) {
        console.log(`Error: ${err.message}`.red.bold);
        process.exit();
    }
}

module.exports = connectToDB;
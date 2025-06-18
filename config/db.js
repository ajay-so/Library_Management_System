require('dotenv').config();
const mongoose = require("mongoose");

const MONGOURL = process.env.DATABASEURL;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGOURL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectDB;
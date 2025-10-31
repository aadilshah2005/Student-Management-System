const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async (req, res) =>{
    try {
        await mongoose.connect(MONGO_URI).
        then(
            console.log("Databse Connection Successfully...")  
        )
    } catch (error) {
        console.log("Database Connection Failed...");
        res.status(500).json({success: false, message: "Database Connection Failed..."})
    }
}

module.exports = connectDB;
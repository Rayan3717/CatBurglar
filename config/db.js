const mongoose = require("mongoose");

const db = async function () {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to Database");
    } catch (error) {
        console.log("Error connecting to Database", error);
        process.exit(1);
    }
}

module.exports = db;
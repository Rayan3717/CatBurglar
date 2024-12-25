const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    type: String,
    expense: String,
    income: String,
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model("data", dataSchema);
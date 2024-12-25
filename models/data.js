const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    type: { type: String, required: true },
    expense: { type: Number, required: true },
    income: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
});

module.exports = mongoose.model('data', dataSchema); // Ensure the model name is "data"

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    datas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'data' }], // Use the model name 'data'
});

module.exports = mongoose.model('user', userSchema);

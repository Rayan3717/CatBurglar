const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    datas: [{ type: mongoose.Types.ObjectId, ref: "data" }]
});

module.exports = mongoose.model("user", userSchema);
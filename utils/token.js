const jwt = require("jsonwebtoken");

async function generateToken(data) {
    return await jwt.sign(data, process.env.JWT_SECRET);
}

module.exports = generateToken;
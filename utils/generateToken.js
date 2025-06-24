require('dotenv').config();
const User = require("../models/User");
const jwt = require('jsonwebtoken');

function generateToken() {
    const payload = { userId: User._id };
    const secret = process.env.JWT_KEY;
    const token = jwt.sign(payload, secret, { expiresIn: "24h" });
    console.log("Generated Token:", token);
    return token;
};

module.exports = { generateToken }
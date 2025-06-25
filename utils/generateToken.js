require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "24h" });
    console.log("Generated Token:", token);
    return token;
};

module.exports = { generateToken }
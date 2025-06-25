const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) throw new Error("Token not provided or invalid");

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decoded.userId);

        if (!user) throw new Error("User not found");

        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: `${err}`
        });
    }
};

const isAuthorized = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    next();
};

const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({
            message: "Admin access only"
        });
    }
    next();
};

module.exports = { authenticate, isAuthorized, isAdmin };
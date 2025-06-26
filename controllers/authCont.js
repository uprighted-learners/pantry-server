const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const SALT = Number(process.env.SALT);
const { generateToken } = require("../utils/generateToken");



const registerUser = async (req, res) => {
    console.log("Let's get you registered");
    try {
        const { fullName, zipCode, email, password, isAdmin } = req.body;
        console.log(fullName, zipCode, email, password, isAdmin);

        const existingUser = await User.findOne({ "email": email });
        if (existingUser) {
            return res.status(409).json({ 
                message: "A user with this email already exists, please log in."
            });
        }

        const hashedPassword = bcryptjs.hashSync(password, SALT);

        const newUser = new User({
            fullName,
            zipCode,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false
        });

        await newUser.save();

        const token = generateToken(newUser);
        console.log("New user generated token:", token);

        res.status(201).json({
            message: "User created",
            user: {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                isAdmin: newUser.isAdmin
            },
            token
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong on our end. Please try again later."
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ "email": email });
        if (!user) return res.status(404).json({
            message: "User not found, please register or check your information and try again."
        });

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) return res.status(401).json({
            message: "Invalid entry, please try again"
        });

        const token = generateToken(user);
        console.log(token);

        res.status(200).json({
            message: "Login Successful",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                isAdmin: user.isAdmin
            },
            token
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: `${err}`
        });
    }
};



module.exports = { registerUser, loginUser };// Should include isAdmin, authorization, and authentication
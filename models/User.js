const mongoose = require('mongoose');
const userSchema = new mongoose.Schema ({
    fullName: {
        type: String,
        required: true, 
        maxlength: 100, 
    }, 
    zipCode: {
        type: String, 
        required: true, 
        maxlength: 9, 
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true, 
        maxlength: 255, 
    },
    password: {
        type: String, 
        required: true, 
    },
    isAdmin: {
        type: Boolean, 
        default: false, 
    }, 
}
) 
module.exports = mongoose.model("user", userSchema);

// const User = require ('../models/User');

// app
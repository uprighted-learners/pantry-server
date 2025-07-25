const mongoose = require("mongoose");

const getInvolvedSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String, 
        required: false,
        match: [/^\d{10}$/, "Phone number must be 10 digits with no spaces or symbols"]
    },

    email: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    typeOfInquiry: {
        type: String,
        enum: [  // enumeration - sets specific requirements for values
            "I need help",
            "I want to volunteer",
            "New pantry suggestion",
            "Update a current pantry",
            "Other"
        ],
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("GetInvolved", getInvolvedSchema)
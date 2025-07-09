const mongoose = require("mongoose");

const getInvolvedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String, 
        required: false
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
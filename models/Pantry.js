const mongoose = require('mongoose');

const pantrySchema = new mongoose.Schema({
        pantryName: { type: String, required: true },
     address: String,
     city: String,
     state: String,
        zipCode: { type: String, required: true },
     hours: String,
     requirements: [String],
     contact: String
});

const Pantry = mongoose.model('Pantry', pantrySchema)
module.exports = Pantry;

const mongoose = require('mongoose');

// Missy made schema keys/value pairs required
const pantrySchema = new mongoose.Schema({
   pantryName: { 
      type: String, 
      required: true 
   },

   address: {
      type: String,
      required: true
   },

   city: {
      type: String,
      required: true
   },

   state: {
      type: String,
      required: true
   },

   zipCode: { 
      type: String, 
      required: true 
   },

   hours: {
      type: String,
      required: true
   },

   requirements: {
      type: [String],
      required: true
   },

   contact: {
      type: String,
      required: true
   },

   lat: {
      type: Number,
      required: true
   },

   lng: {
      type: Number,
      required: true
   }
});

const Pantry = mongoose.model('Pantry', pantrySchema)
module.exports = Pantry;

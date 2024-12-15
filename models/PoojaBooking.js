const mongoose = require('mongoose');

// Define the schema for the Pooja Booking form
const poojaBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    enum: ["morning", "afternoon", "evening"],
    required: true,
  },
  pooja: {
    type: String,
    enum: ["ganesh", "laxmi", "saraswati"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
  },
});

// Create the model
const PoojaBooking = mongoose.model("PoojaBooking", poojaBookingSchema);

module.exports = PoojaBooking;

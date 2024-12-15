// routes/poojaBookings.js
const express = require('express');
const router = express.Router();
const PoojaBooking = require('../models/PoojaBooking'); 

// Add a new booking
router.post('/add', async (req, res) => {
  try {
    const newBooking = new PoojaBooking(req.body);
    await newBooking.save();
    res.status(201).json({ message: 'Booking added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding booking', error });
  }
});

// Fetch all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await PoojaBooking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
});

module.exports = router;

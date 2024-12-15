const express = require('express');
const Pooja = require('../models/Pooja');

const router = express.Router();

router.get('/poojas', async (req, res) => {
  try {
    const poojas = await Pooja.find();
    res.json(poojas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pooja data', error });
  }
});

module.exports = router;

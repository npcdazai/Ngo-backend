const express = require('express');
const Member = require('../models/Member');
const router = express.Router();

// GET all members
router.get('/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching members' });
  }
});

module.exports = router;

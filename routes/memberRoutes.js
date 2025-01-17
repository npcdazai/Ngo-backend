// routes/memberRoutes.js

const express = require('express');
const Member = require('../models/Member');
const upload = require('../config/multerConfig'); // Import multer setup
const router = express.Router();

// POST route for adding or updating a member
router.post('/members', upload.single('image'), async (req, res) => {
  const { name, role } = req.body;
  const image = req.file ? `/uploads/members/${req.file.filename}` : null;

  try {
    const newMember = new Member({ name, role, image });
    await newMember.save();
    res.status(201).json(newMember); // Send the new member data as response
  } catch (error) {
    res.status(500).json({ message: 'Error saving member', error });
  }
});

// Get all members
router.get('/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching members', error });
  }
});

// Delete member by ID
router.delete('/members/:id', async (req, res) => {
  
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json({ message: 'Member deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting member', error });
  }
});

module.exports = router;

const Member = require('../models/Member'); // Assuming the model path is correct

// Get all members
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching members', error });
  }
};

// Add or update member
exports.saveMember = async (req, res) => {
  const { id, name, role, image } = req.body;
  try {
    let member;
    if (id) {
      // Update existing member
      member = await Member.findByIdAndUpdate(id, { name, role, image }, { new: true });
    } else {
      // Add new member
      member = new Member({ name, role, image });
      await member.save();
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Error saving member', error });
  }
};

// Delete member
exports.deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Member deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting member', error });
  }
};

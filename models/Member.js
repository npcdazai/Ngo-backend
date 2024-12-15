const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Store image path or URL
    required: true,
  },
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;

const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  media: {
    type: String,
    required: true,
    trim: true, // URL or path to the media (photo/video)
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Event", EventSchema);

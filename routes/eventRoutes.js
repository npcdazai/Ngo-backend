const express = require("express");
const Event = require("../models/Events");
const upload = require("../config/multerConfig"); // Assuming multerConfig.js is in the 'config' folder
const router = express.Router();

// Create a new event with media upload
router.post("/events", upload.single("media"), async (req, res) => {
  try {
    const { name, description, date } = req.body;
    const mediaUrl = req.file ? req.file.path : ""; // Save the uploaded file path

    const event = new Event({
      name,
      description,
      media: mediaUrl,
      date
    });

    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (err) {
    res.status(400).json({ message: "Error creating event", error: err.message });
  }
});

// Get all events
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ message: "Error fetching events", error: err.message });
  }
});

// Get event by ID
router.get("/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ message: "Error fetching event", error: err.message });
  }
});

// Update an event by ID (with media upload)
router.put("/events/:id", upload.single("media"), async (req, res) => {
  try {
    const { name, description, date } = req.body;
    const mediaUrl = req.file ? req.file.path : undefined; // If there's a new file, update the media URL

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { name, description, date, media: mediaUrl },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully", updatedEvent });
  } catch (err) {
    res.status(400).json({ message: "Error updating event", error: err.message });
  }
});

// Delete an event by ID
router.delete("/events/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting event", error: err.message });
  }
});

module.exports = router;

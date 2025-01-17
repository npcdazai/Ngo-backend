// server.js

const fs = require('fs');
const path = require('path');

// Check if the uploads/members folder exists, if not create it
const uploadsDir = path.join(__dirname, 'uploads/members');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const memberRoutes = require("./routes/memberRoutes");  
const poojaRoutes = require("./routes/poojaRoutes");
const poojaBookingsRoutes = require("./routes/poojaBookingRoutes");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads folder

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed", err));

// Basic route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Routes
app.use('/api', memberRoutes);
app.use('/api', poojaRoutes);
app.use('/api/poojaBookings', poojaBookingsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

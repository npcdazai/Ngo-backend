const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const dotenv = require("dotenv");
const memberRoutes = require("./routes/memberRoutes");  // <-- Add this line
const poojaRoutes = require("./routes/poojaRoutes");
const poojaBookingsRoutes = require("./routes/poojaBookingRoutes");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/members'); // Store files in the members folder
  },
  filename: (req, file, cb) => {
    // Use timestamp to make the filename unique
    cb(null, Date.now() + path.extname(file.originalname));
  },
});



const upload = multer({ storage });

// API endpoint to handle image uploads
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    const filePath = `/uploads/members/${req.file.filename}`;
    res.json({ image: filePath }); // Send the file path to the frontend
  } else {
    res.status(400).send('No file uploaded');
  }
});
app.use((req, res, next) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  next();
});
// Routes
// Serve the images from the uploads folder
app.use('/uploads', express.static('uploads')); // Make the uploads folder publicly accessible

app.use('/api', memberRoutes);
app.use('/api', poojaRoutes);
app.use('/api/poojaBookings', poojaBookingsRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

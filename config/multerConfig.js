// config/multerConfig.js

const multer = require('multer');
const path = require('path');

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

module.exports = upload;

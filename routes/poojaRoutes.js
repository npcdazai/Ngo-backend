const express = require('express');
const Pooja = require('../models/Pooja'); // Assuming your Mongoose model is named Pooja
const upload = require('../config/multerConfig'); // Import multer setup
const router = express.Router();

// Fetch all Poojas
router.get('/poojas', async (req, res) => {
    try {
        const poojas = await Pooja.find();
        res.status(200).json(poojas);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching poojas', error });
    }
});

// Add a New Pooja (With Image Upload)
router.post('/poojas', upload.single('image'), async (req, res) => {
    try {
        const { name, description } = req.body;
        const image = req.file ? `/uploads/poojas/${req.file.filename}` : null;

        if (!name || !description) {
            return res.status(400).json({ message: 'Name and description are required' });
        }

        const newPooja = new Pooja({ 
            name, 
            description, 
            image, 
            link: "/pooja-offering" // Ensuring link is always set
        });
        await newPooja.save();

        res.status(201).json({ message: 'Pooja added successfully', pooja: newPooja });
    } catch (error) {
        res.status(500).json({ message: 'Error adding pooja', error });
    }
});

// Update an Existing Pooja (With Image Upload)
router.put('/poojas/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const image = req.file ? `/uploads/poojas/${req.file.filename}` : undefined;

        const updateData = { name, description, link: "/pooja-offering" }; 
        if (image) updateData.image = image; // Only update the image if a new one is uploaded

        const updatedPooja = await Pooja.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedPooja) {
            return res.status(404).json({ message: 'Pooja not found' });
        }

        res.status(200).json({ message: 'Pooja updated successfully', pooja: updatedPooja });
    } catch (error) {
        res.status(500).json({ message: 'Error updating pooja', error });
    }
});

// Delete a Pooja
router.delete('/poojas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPooja = await Pooja.findByIdAndDelete(id);

        if (!deletedPooja) {
            return res.status(404).json({ message: 'Pooja not found' });
        }

        res.status(200).json({ message: 'Pooja deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting pooja', error });
    }
});

module.exports = router;

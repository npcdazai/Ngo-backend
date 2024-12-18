const mongoose = require('mongoose');
const Member = require('./models/Member'); // Adjust the path to your Member model
const membersData = require('./members.json'); // Adjust the path to your JSON file

// MongoDB connection
mongoose.connect('mongodb+srv://gilli:gilli12@cluster0.avhtgri.mongodb.net/temple?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Function to seed data
const seedMembers = async () => {
  try {
    // Remove existing data (optional)
    await Member.deleteMany({});
    console.log('Existing members removed');

    // Insert new data
    await Member.insertMany(membersData);
    console.log('Members added successfully');

    // Close the connection
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding members:', error);
    mongoose.disconnect();
  }
};

// Run the function
seedMembers();

const mongoose = require('mongoose');
const Pooja = require('./models/Pooja');

// Replace with your MongoDB connection URI
const MONGO_URI = "mongodb+srv://gilli:gilli12@cluster0.avhtgri.mongodb.net/temple?retryWrites=true&w=majority&appName=Cluster0";

// Example pooja data
const poojasData = [
  {
    name: "Ganesh Pooja",
    description: "Invoke the blessings of Lord Ganesh for wisdom and prosperity.",
    image: "../src/assets/Images/Poojas/ganeshpuja.png",
    link: "/pooja-offering",
  },
  {
    name: "Laxmi Pooja",
    description: "Seek the blessings of Goddess Laxmi for wealth and prosperity.",
    image: "../src/assets/Images/Poojas/laximpuja.png",
    link: "/pooja-offering",
  },
  {
    name: "Saraswati Pooja",
    description: "Dedicated to Goddess Saraswati for knowledge and creativity.",
    image: "../src/assets/Images/Poojas/Saraswatipuja.png",
    link: "/pooja-offering",
  },
  {
    name: "Hanuman Pooja",
    description: "Performed to seek the protection and blessings of Lord Hanuman.",
    image: "../src/assets/Images/Poojas/humanpuja.png",
    link: "/pooja-offering",
  },
  {
    name: "Navagraha Pooja",
    description: "A ritual to pacify the nine celestial planets for harmony.",
    image: "../src/assets/Images/Poojas/puja.png",
    link: "/pooja-offering",
  },
  {
    name: "Shiva Pooja",
    description: "Dedicated to Lord Shiva to remove negativity and seek blessings.",
    image: "../src/assets/Images/Poojas/shivpuja.png",
    link: "/pooja-offering",
  },
];

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');

  // Clear existing data (optional)
  await Pooja.deleteMany({});
  console.log('Existing pooja data cleared.');

  // Insert new pooja data
  await Pooja.insertMany(poojasData);
  console.log('Poojas added successfully.');

  // Disconnect from database
  mongoose.disconnect();
}).catch((err) => {
  console.error('Error:', err);
});

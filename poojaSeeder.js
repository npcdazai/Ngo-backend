const mongoose = require("mongoose");
const Pooja = require("./models/Pooja");

// Replace with your MongoDB connection URI
const MONGO_URI =
  "mongodb+srv://gilli:gilli12@cluster0.avhtgri.mongodb.net/temple?retryWrites=true&w=majority&appName=Cluster0";

// Example pooja data
const poojasData = [
  {
    name: "Ganesh Pooja",
    description:
      "Invoke the blessings of Lord Ganesh for wisdom and prosperity.",
    image: "../src/assets/Images/Poojas/ganeshpuja.png",
    link: "/pooja-offering",
  },
  {
    name: "Laxmi Pooja",
    description:
      "Seek the blessings of Goddess Laxmi for wealth and prosperity.",
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
    name: "Vastu Shanti Pooja",
    description:
      "घर या कार्यालय के वास्तु दोषों को दूर करने के लिए यह पूजा की जाती है, जिससे शांति और समृद्धि आती है।",
    image: "../src/assets/Images/Poojas/humanpuja.png",
    link: "/pooja-offering",
  },
  {
    name: "Navagraha Pooja",
    description:
      "ग्रहों के अशुभ प्रभावों को कम करने और जीवन में संतुलन लाने के लिए यह पूजा की जाती है।",
    image: "../src/assets/Images/Poojas/puja.png",
    link: "/pooja-offering",
  },
  {
    name: "Shiva Pooja",
    description:
      "Dedicated to Lord Shiva to remove negativity and seek blessings.",
    image: "../src/assets/Images/Poojas/shivpuja.png",
    link: "/pooja-offering",
  },
];

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Clear existing data (optional)
    await Pooja.deleteMany({});
    console.log("Existing pooja data cleared.");

    // Insert new pooja data
    await Pooja.insertMany(poojasData);
    console.log("Poojas added successfully.");

    // Disconnect from database
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error:", err);
  });

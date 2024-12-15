const mongoose = require('mongoose');
const Member = require('./models/Member');

const MONGO_URI="mongodb+srv://gilli:gilli12@cluster0.avhtgri.mongodb.net/temple?retryWrites=true&w=majority&appName=Cluster0"


const membersData = [
    { name: "Aashutos Upadyyay", role: "Member", image: "../src/assets/Images/members/images/Aashutos.jpg" },
    { name: "Ajay Tiwari", role: "Member", image: "../src/assets/Images/members/images/ajay.jpg" },
    { name: "Ambuj Dubey", role: "Member", image: "../src/assets/Images/members/images/ambuj.jpg" },
    { name: "Amit Tiwari", role: "Member", image: "../src/assets/Images/members/images/Amit.jpg" },
    { name: "Anjani Shukla", role: "Member", image: "../src/assets/Images/members/images/Anjani.jpg" },
    { name: "Ankus Tiwari", role: "Member", image: "../src/assets/Images/members/images/Ankus.jpg" },
    { name: "Awadhes Tiwari", role: "Member", image: "../src/assets/Images/members/images/awadhes.jpg" },
    { name: "Banarsi Lal", role: "Member", image: "../src/assets/Images/members/images/banarsi.jpg" },
    { name: "Prashant Tiwari", role: "Member", image: "../src/assets/Images/members/images/Prsant.jpg" },
    { name: "Dhanesh Dubey", role: "Member", image: "../src/assets/Images/members/images/Dhanesh.jpg" },
    { name: "Munna Singh", role: "Member", image: "../src/assets/Images/members/images/Munna.jpg" },
    { name: "Pankaj Gupta", role: "Member", image: "../src/assets/Images/members/images/Pankaj.jpg" },
    { name: "Rupesh Tiwari", role: "Member", image: "../src/assets/Images/members/images/Rupesh.jpg" },
    { name: "Sandeep Singh", role: "Member", image: "../src/assets/Images/members/images/sandeep.jpg" },
    { name: "Santosh Tiwari", role: "Member", image: "../src/assets/Images/members/images/Santosh.jpg" },
    { name: "Shubhas Tiwari", role: "Member", image: "../src/assets/Images/members/images/Shubhas.jpg" },
    { name: "Suraj Tiwari", role: "Member", image: "../src/assets/Images/members/images/Suraj.jpg" },
    { name: "Syam Mohan Tiwari", role: "Member", image: "../src/assets/Images/members/images/Syam.jpg" },
    { name: "Sanjay Tiwari", role: "Member", image: "../src/assets/Images/members/images/Sanjay.jpg" },
    { name: "Dinesh Tiwari", role: "Member", image: "../src/assets/Images/members/images/dinesh.jpg" }
  ];
  

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');
  await Member.deleteMany({}); // Optional: clear existing data
  await Member.insertMany(membersData);
  console.log('Members added');
  mongoose.disconnect();
}).catch((err) => {
  console.error('Error', err);
});

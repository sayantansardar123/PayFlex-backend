const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  const dbURI = process.env.MONGO_URI;
  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB Connected Successfully ✅");
  } catch (error) {
    console.log("MongoDB Connection Error ❌", error);
    process.exit(1);
  }
}

module.exports = connectDB;
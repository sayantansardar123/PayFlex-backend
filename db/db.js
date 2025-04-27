const mongoose = require('mongoose')

const connectDB = async () => {
    let dbURI = 'mongodb+srv://Payflex12:sardar%401@cluster0.zfuq9.mongodb.net/?authSource=PayFlex&authMechanism=SCRAM-SHA-1';
    // let dbURI = process.env.MONGO_URL;
    try {
        await mongoose.connect(dbURI);
        console.log("MongoDB Connected Successfully ✅");
    } catch (error) {
        console.log("MongoDB Connection Error ❌",error);
        process.exit(1);
    }
}

module.exports = connectDB;
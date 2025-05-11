const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// defining the user schema
/* const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
}, { timestamps: true }) */

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  upiId: {
    type: String,
    required: false,
    unique: true
  },
  upiPin: {
    type: Number,
    required: false
  }
}, { timestamps: true });


/* userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
}); */


userSchema.pre('save', async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  if(this.isNew && !this.upiPin){
    this.upiPin = Math.floor(100000 + Math.random() * 900000);
  }

  if(this.isNew){
    // Generate UPI ID based on phone number if not already set
    if (!this.upiId && this.phone) {
      this.upiId = `${this.phone}@pyfx`;
    }
  }
  next();
});


userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}


module.exports = mongoose.model("User", userSchema);

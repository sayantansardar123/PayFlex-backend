const mongoose = require('mongoose');

const bankNameSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  IFSC: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  logo: {
    type: String,
    required: false
  }
});

const BankName = mongoose.model('BankName', bankNameSchema);

module.exports = BankName;
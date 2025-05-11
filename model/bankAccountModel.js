const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bankId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankName',
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

module.exports = BankAccount;
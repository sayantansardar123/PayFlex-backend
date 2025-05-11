const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  sender: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: { type: String, required: true },
    upiId: { type: String, required: true }
  },
  receiver: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: { type: String, required: true },
    upiId: { type: String, required: true }
  },
  amount: {
    type: Number,
    required: true,
    min: [1, 'Transaction amount must be greater than 0']
  },
  /* transactionType: {
    type: String,
    enum: ['credit', 'debit'], // from the sender's perspective
    required: true
  }, */
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  }
}, {
  timestamps: true // includes createdAt and updatedAt
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
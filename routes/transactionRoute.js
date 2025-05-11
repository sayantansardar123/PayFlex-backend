const express = require('express');
const {
  createTransaction,
  sendMoney,
  getUserTransactions
} = require('../controller/transactionController');
//const { isValidUser } = require('../middleware/user.middleware');


const router = express.Router();


router.post('/transaction/create', createTransaction);
router.post('/send-money', sendMoney);
router.get('/transactions/get/:userId', getUserTransactions);


module.exports = router;
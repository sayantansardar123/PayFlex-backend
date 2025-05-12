const express = require('express');
const {
  createBankName,
  getAllBanks,
  createBankAccount,
  getBankAccountsOfUser
} = require('../controller/bankAccountController');
const { isAuthenticatedUser } = require('../middleware/auth');


const router = express.Router();


router.post('/bankname/create', createBankName);
router.get('/getallbanks', getAllBanks);
router.post('/bankaccount/create', createBankAccount);
router.get('/bankaccounts/get', isAuthenticatedUser, getBankAccountsOfUser);


module.exports = router;
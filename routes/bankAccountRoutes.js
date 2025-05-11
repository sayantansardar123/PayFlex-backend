const express = require('express');
const {
  createBankName,
  getAllBanks,
  createBankAccount
} = require('../controller/bankAccountController');
//const { isValidUser } = require('../middleware/user.middleware');


const router = express.Router();


router.post('/bankname/create', createBankName);
router.get('/getallbanks', getAllBanks);
router.post('/bankaccount/create', createBankAccount);


module.exports = router;
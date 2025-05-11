const express = require('express');
const {
  registerUser,
  loginUser,
  getProfileDetails
} = require('../controller/users.contoller');
const { isValidUser } = require('../middleware/user.middleware');


const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', isValidUser, getProfileDetails)

module.exports = router;
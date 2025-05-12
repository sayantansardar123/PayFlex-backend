const express = require('express');
const {
  registerUser,
  loginUser,
  getUserDetails,
  getUsernameFromId
} = require('../controller/users.contoller');
const { isValidUser } = require('../middleware/user.middleware');
const { isAuthenticatedUser } = require('../middleware/auth');


const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
//router.get('/profile', isValidUser, getProfileDetails);
router.get('/userdetails', isAuthenticatedUser, getUserDetails);
router.get('/username/get/:id', getUsernameFromId);

module.exports = router;
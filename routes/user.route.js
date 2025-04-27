const express = require('express');
const { login, register, profile } = require('../controller/users.contoller');
const { isValidUser } = require('../middleware/user.middleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', isValidUser, profile)

module.exports = router
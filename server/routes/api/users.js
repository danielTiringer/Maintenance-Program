const express = require('express');
const router = express.Router();
const { registerUser, loginUser, authenticateToken, getUserProfile } = require('../../controllers/userController');

// User endpoints

router
	.route('/register')
	.post(registerUser)

router
	.route('/login')
	.post(loginUser)

router
	.route('/profile')
	.get(authenticateToken, getUserProfile)

module.exports = router;

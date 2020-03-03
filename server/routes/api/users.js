const express = require('express');
const router = express.Router();
const passport = require('passport');
const { registerUser, loginUser, getUserProfile } = require('../../controllers/userController');

// User endpoints

router
	.route('/register')
	.post(registerUser)

router
	.route('/login')
	.post(loginUser)

router
	.route('/profile')
	.get(passport.authenticate('jwt', { session: false }), getUserProfile)

module.exports = router;

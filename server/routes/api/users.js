const express = require('express');
// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const dotenv = require('dotenv');
const User = require('../../models/User');

const router = express.Router();

dotenv.config({ path: './server/config/config.env' });

// User endpoints

// @route		POST api/users/register
// @desc		Register a new user
// @access	Public
router.post('/register', (req, res) => {
	let { name, username, email, password, confirm_password } = req.body;
	if (password !== confirm_password) {
		return res.status(400).json({
			message: 'The passwords did not match!'
		})
	} else {
		// Verify if username is unique
		User.findOne({ username: username })
			.then(user => {
				if (user) {
					return res.status(400).json({
						message: 'Username already in use.'
					})
				}
			})
		// Verify if email is unique
		User.findOne({ email: email })
			.then(user => {
				if (user) {
					return res.status(400).json({
						message: 'Email already registered.'
					})
				}
			})
		// Register user
		let newUser = new User({
			name,
			username,
			password,
			email
		});
		// Hash password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) { throw err; }
				newUser.password = hash;
				newUser.save().then(() => {
					return res.status(201).json({
						success: true,
						message: 'User registered.'
					})
				})
			})
		})
	}
})

// @route		POST api/users/login
// @desc		Log the user in
// @access	Private
router.post('/login', (req, res) => {
	User.findOne({ email: req.body.email })
		.then(user => {
			if (!user) {
				return res.status(404).json({
					success: false,
					message: 'Email not found.'
				})
			}
			// Compare password
			bcrypt.compare(req.body.password, user.password)
				.then(isMatch => {
					if (isMatch) {
						// Correct password, sending json token
						const payload = {
							_id: user._id,
							username: user.username,
							name: user.name,
							email: user.email
						};

						jwt.sign(payload, process.env.SECRET, {
							expiresIn: 3600
						}, (err, token) => {
							res.status(200).json({
								success: true,
								token: `Bearer ${token}`,
								user: user,
								message: 'You are now logged in.'
							})
						})
					} else {
						return res.status(404).json({
							success: false,
							message: 'Incorrect password.'
						})
					}
				})
		})
})

// @route		GET api/users/profile
// @desc		Get user data page
// @access	Private
router.get('/profile', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	return res.json({
		user: req.user
	});
})

module.exports = router;

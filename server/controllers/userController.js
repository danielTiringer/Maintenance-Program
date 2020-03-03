const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config({ path: './server/config/config.env' });

const jwtKey = process.env.SECRET || 'testkey';

// @route   POST api/users/register
// @desc    Register a new user
// @access  Public
exports.registerUser = (req, res) => {
	let { name, username, email, password, confirm_password } = req.body;
	if (password !== confirm_password) {
		return res.status(400).json({
			success: false,
			message: 'The passwords did not match!'
		})
	} else {
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
				newUser
					.save()
					.then(() => {
						return res.status(201).json({
							success: true,
							message: 'User registered.'
						})
					})
					.catch(err => {
						if (err.name === 'ValidationError') {
							const messages = Object.values(err.errors).map(val => val.message);
							return res.status(400).json({
								success: false,
								error: messages
							});
						} else {
							return res.status(500).json({
								success: false,
								error: 'Server error.'
							})
						}

					})
			})
		})
	}
}

// @route   POST api/users/login
// @desc    Log the user in
// @access  Private
exports.loginUser = (req, res) => {
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

						jwt.sign(payload, jwtKey, {
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
}

exports.authenticateToken = passport.authenticate('jwt', { session: false })

exports.getUserProfile = (req, res) => {
	return res.json({
		success: true,
		user: req.user
	})
}

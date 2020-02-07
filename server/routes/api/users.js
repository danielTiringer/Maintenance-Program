const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const dotenv = require('dotenv');
const User = require('../../model/User');

const router = express.Router();

dotenv.config();

// User Endpoints

// Register the User
router.post('/register', (req, res) => {
	let { name, username, email, password, confirm_password } = req.body;
	if (password !== confirm_password) {
		return res.status(400).json({
			msg: 'The passwords did not match!'
		})
	} else {
		// Verify if username is unique
		User.findOne({ username: username })
			.then(user => {
				if (user) {
					return res.status(400).json({
						msg: 'Username already in use.'
					})
				}
			})
		// Verify if email is unique
		User.findOne({ email: email })
			.then(user => {
				if (user) {
					return res.status(400).json({
						msg: 'Email already registered.'
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
				newUser.save().then(user => {
					return res.status(201).json({
						success: true,
						msg: 'User registered.'
					})
				})
			})
		})
	}
})

// Log the User In
router.post('/login', (req, res) => {
	User.findOne({ email: req.body.email })
		.then(user => {
			if (!user) {
				return res.status(404).json({
					success: false,
					msg: 'Email not found.'
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
								msg: 'You are now logged in.'
							})
						})
					} else {
						return res.status(404).json({
							success: false,
							msg: 'Incorrect password.'
						})
					}
				})
		})
})

// User Data Page
router.get('/profile', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	return res.json({
		user: req.user
	});
})


// Connect to MongoDB
mongoose.connect(process.env.DB_HOST, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log('MongoDB connected.'))
	.catch(error => console.log(error))

module.exports = router;

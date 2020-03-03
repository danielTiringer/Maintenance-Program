const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
dotenv.config({ path: './server/config/config.env' });

const assets = require('./routes/api/assets');
const clients = require('./routes/api/clients');
const users = require('./routes/api/users');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use(passport.initialize());
require('./config/passport')(passport);

// Handling production
if(process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static(__dirname + '/public/'));

	// Handle single page app
	app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

// Use routes
app.use('/api/assets', assets);
app.use('/api/clients', clients);
app.use('/api/users', users);

module.exports = app;

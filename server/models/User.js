const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


// Create User schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		unique: true,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
})

UserSchema.plugin(uniqueValidator);

// eslint-disable-next-line no-undef
module.exports = User = mongoose.model('users', UserSchema)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User schema
const ClientSchema = new Schema({
	name: {
		type: String,
		trim: true,
		minlength: 3,
		required: [true, 'Please add the Client Name.']
	},
	contacts: {
		type: Array,
		default: []
	},
	date: {
		type: Date,
		default: Date.now()
	}
})
// eslint-disable-next-line no-undef
module.exports = Client = mongoose.model('clients', ClientSchema)

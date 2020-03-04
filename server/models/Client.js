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
	contacts: [
		{
			name: {
				type: String,
				required: [true,'Please add the Contact Name.'],
				trim: true
			},
			title: {
				type: String,
				required: [true,'Please add the Contact Title.'],
				trim: true
			},
			zip: {
				type: Number,
				min: 1000,
				max: 9999,
				required: [true, 'Please add the Contact Postal Code.'],
				validate : {
					validator : Number.isInteger,
					message   : '{VALUE} is not an integer value.'
				}
			},
			city: {
				type: String,
				required: [true,'Please add the Contact City.'],
				trim: true
			},
			address: {
				type: String,
				required: [true,'Please add the Contact Address.'],
				trim: true
			},
			phone: {
				type: String,
				required: [true,'Please add the Contact Phone Number.'],
				trim: true
			},
			email: {
				type: String,
				required: [true,'Please add the Contact Email.'],
				trim: true
			}
		}
	],
	date: {
		type: Date,
		default: Date.now()
	}
})

// eslint-disable-next-line no-undef
module.exports = Client = mongoose.model('clients', ClientSchema)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User schema
const AssetSchema = new Schema({
	assetId: {
		type: String,
		trim: true,
		required: [true, 'Please add the Asset ID.']
	},
	serialNumber: {
		type: String,
		trim: true,
		required: [true, 'Please add the Serial Number.']
	},
	dateOfInstall: {
		type: Date,
		required: [true, 'Please add the Date of Install.']
	},
	zip: {
		type: Number,
		min: 1000,
		max: 9999,
		required: [true, 'Please add the Postal Code.'],
		validate : {
			validator : Number.isInteger,
			message   : '{VALUE} is not an integer value.'
		}
	},
	city: {
		type: String,
		trim: true,
		required: [true, 'Please add the City.']
	},
	address: {
		type: String,
		trim: true,
		required: [true, 'Please add the Address.']
	},
	description: {
		type: String,
		trim: true,
		required: [true, 'Please add the Description.']
	},
	maintenanceSchedule: {
		type: String,
		enum: ['annual', 'semi-annual'],
		required: [true, 'Please add the Maintenance Schedule.']
	},
	nextScheduledDate: {
		type: Date,
		required: [true, 'Please add the Next Scheduled Date.']
	},
	maintenanceLog: {
		type: Array,
		default: []
	},
	date: {
		type: Date,
		default: Date.now()
	}
})
// eslint-disable-next-line no-undef
module.exports = Asset = mongoose.model('assets', AssetSchema)

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
	maintenanceLog: [
		{
			date: {
				type: Date,
				required: true
			},
			errorDescription: {
				type: String,
				required: [completionValidator, 'Please add the Error Description'],
				trim: true
			},
			maintenanceDescription: {
				type: String,
				trim: true,
				minlength: 5,
				required: [true, 'Please add the Maintenance Description.']
			},
			completed: {
				type: Boolean,
				required: true,
				default: false
			}
		}
	],
	date: {
		type: Date,
		default: Date.now()
	}
})

function completionValidator() {
  return this.completed;
}

// eslint-disable-next-line no-undef
module.exports = Asset = mongoose.model('assets', AssetSchema)

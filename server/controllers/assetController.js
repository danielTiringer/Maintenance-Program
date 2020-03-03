const Asset = require('../models/Asset');

// @route   GET api/assets
// @desc    Get assets
// @access  Private
exports.getAssets = (req, res) => {
	Asset.find()
		.sort({ dateOfInstall: 1 })
		.then(items => res.status(200).json({
			success: true,
			data: items
		}))
		.catch(err => res.status(400).json({
			success: false,
			message: err
		}))
}

// @route   POST api/assets
// @desc    Add asset
// @access  Private
exports.addAsset = (req, res) => {
	const newAsset = new Asset({
		assetId: req.body.assetId,
		serialNumber: req.body.serialNumber,
		dateOfInstall: req.body.dateOfInstall,
		zip: req.body.zip,
		city: req.body.city,
		address: req.body.address,
		description: req.body.description,
		maintenanceSchedule: req.body.maintenanceSchedule,
		nextScheduledDate: req.body.nextScheduledDate,
		maintenanceLog: [],
		createdAt: new Date()
	});

	newAsset.save()
		.then(item => res.status(201).json({
			success: true,
			data: item
		}))
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
};

// @route   GET api/assets/:id
// @desc    Get single asset
// @access  Private
exports.getAsset = (req, res) => {
	Asset.findById(req.params.id)
		.then(item => res.status(200).json({
			success: true,
			data: item
		}))
		.catch(err => res.status(404).json({
			success: false,
			message: err
		}))
};

// @route   DELETE api/assets/:id
// @desc    Delete asset
// @access  Private
exports.deleteAsset = (req, res) => {
	Asset.findById(req.params.id)
		.then(asset => asset.remove()
		.then(() => res.json({
			success: true,
			data: {}
		})))
		.catch(err => res.status(404).json({
			success: false,
			message: err
		}))
};

// @route   PUT api/assets/:id
// @desc    Modify asset
// @access  Private
exports.updateAsset = (req, res) => {
	Asset.updateOne(
		{ _id: req.params.id },
		{ $set: req.body },
		{ runValidators: true }
	)
		.then(item => res.status(200).json({
			success: true,
			data: item
		}))
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
};

// @route   POST api/assets/:id/maintenance
// @desc    Add Maintenance
// @access  Private
exports.addMaintenance = (req, res) => {
	Asset.updateOne(
		{ _id: req.params.id },
		// { runValidators: true },
		{
			$push: {
				maintenanceLog: {
					$each: [{
						date: req.body.date,
						errorDescription: req.body.errorDescription,
						maintenanceDescription: req.body.maintenanceDescription,
						completed: req.body.completed,
						createdAt: new Date()
					}],
					$position: 0
				},
			}
		}
	)
		.then(item => res.status(201).json({
			success: true,
			data: item
		}))
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
};

// @route   PUT api/assets/:id/maintenance/:position
// @desc    Update Maintenance
// @access  Private
exports.updateMaintenance = (req, res) => {
	Asset.updateOne(
		{ _id: req.params.id },
		// { runValidators: true },
		{ $set: { [`maintenanceLog.${req.params.position}`]: req.body } }
	)
		.then(item => res.status(200).json({
			success: true,
			data: item
		}))
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
};

const express = require('express');
const dotenv = require('dotenv');
const Asset = require('../../models/Asset');

const router = express.Router();

dotenv.config({ path: './server/config/config.env' });

// Main Asset Endpoints

// @route		GET api/assets
// @desc		Get assets
// @access	Private
router.get('/', (req, res) => {
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
})

// @route		POST api/assets
// @desc		Add asset
// @access	Private
router.post('/', (req, res) => {
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
		.catch(err => res.status(400).json({
			success: false,
			message: err
		}))
});

// @route		GET api/assets/:id
// @desc		Get single asset
// @access	Private
router.get('/:id', (req, res) => {
	Asset.findById(req.params.id)
		.then(item => res.status(200).json({
			success: true,
			data: item
		}))
		.catch(err => res.status(404).json({
			success: false,
			message: err
		}))
});

// @route		DELETE api/assets/:id
// @desc		Delete asset
// @access	Private
router.delete('/:id', (req, res) => {
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
});

// @route		PUT api/assets/:id
// @desc		Modify asset
// @access	Private
router.put('/:id', (req, res) => {
	Asset.updateOne(
		{ _id: req.params.id },
		{ $set: req.body },
		{ runValidators: true }
	)
		.then(item => res.status(200).json({
			success: true,
			data: item
		}))
		.catch(err => res.status(404).json({
			success: false,
			message: err
		}))
});


// // Asset Maintenance Endpoints

// // Add Maintenance
// router.post('/:id/maintenance', async (req, res) => {
// 	const assets = await loadAssetsCollection();
// 	await assets.updateOne(
// 		{ _id: new mongodb.ObjectID(req.params.id) },
// 		{
// 			$push: {
// 				maintenanceLog: {
// 					$each: [{
// 						date: req.body.date,
// 						errorDescription: req.body.errorDescription,
// 						maintenanceDescription: req.body.maintenanceDescription,
// 						completed: req.body.completed,
// 						createdAt: new Date()
// 					}],
// 					$position: 0
// 				},
// 			}
// 		}
// 	);
// 	res.status(201).send();
// })

// // Update Maintenance
// router.put('/:id/maintenance/:position', async (req, res) => {
// 	const assets = await loadAssetsCollection();
// 	await assets.updateOne(
// 		{ _id: new mongodb.ObjectID(req.params.id) },
// 		{ $set: { [`maintenanceLog.${req.params.position}`]: req.body } }
// 	);
// 	res.status(200).send();
// });


// // Router Connection
// async function loadAssetsCollection() {
// 	const client = await mongodb.MongoClient.connect(process.env.DB_HOST, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true
// 	});

// 	return client.db('Maintenance-Program').collection('assets');
// }

module.exports = router;

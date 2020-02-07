const express = require('express');
const mongodb = require('mongodb');
const dotenv = require('dotenv');

const router = express.Router();

dotenv.config();


// Main Asset Endpoints

// Get Assets

router.get('/', async (req, res) => {
	const assets = await loadAssetsCollection();
	res.send(await assets.find({}).toArray());
})

// Add Asset
router.post('/', async (req, res) => {
	const assets = await loadAssetsCollection();
	await assets.insertOne({
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
	res.status(201).send();
});

// Get Single Asset
router.get('/:id', async (req, res) => {
	const assets = await loadAssetsCollection();
	res.send(await assets.findOne({ _id: new mongodb.ObjectID(req.params.id) }))
});

// Delete Asset
router.delete('/:id', async (req, res) => {
	const assets = await loadAssetsCollection();
	await assets.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
	res.status(200).send();
});

// Modify Asset
router.put('/:id', async (req, res) => {
	const assets = await loadAssetsCollection();
	await assets.updateOne(
		{ _id: new mongodb.ObjectID(req.params.id) },
		{ $set: req.body }
	);
	res.status(200).send();
});


// Asset Maintenance Endpoints

// Add Maintenance
router.post('/:id/maintenance', async (req, res) => {
	const assets = await loadAssetsCollection();
	await assets.updateOne(
		{ _id: new mongodb.ObjectID(req.params.id) },
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
	);
	res.status(201).send();
})

// Update Maintenance
router.put('/:id/maintenance/:position', async (req, res) => {
	const assets = await loadAssetsCollection();
	await assets.updateOne(
		{ _id: new mongodb.ObjectID(req.params.id) },
		{ $set: { [`maintenanceLog.${req.params.position}`]: req.body } }
	);
	res.status(200).send();
});


// Router Connection
async function loadAssetsCollection() {
	const client = await mongodb.MongoClient.connect(process.env.DB_HOST, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	return client.db('Maintenance-Program').collection('assets');
}

module.exports = router;

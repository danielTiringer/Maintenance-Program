const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Assets

router.get('/', async (req, res) => {
	const assets = await loadAssetsCollection();
	res.send(await assets.find({}).toArray());
})

// Add Assets
router.post('/', async (req, res) => {
	const assets = await loadAssetsCollection();
	await assets.insertOne({
		assetId: req.body.assetId,
		serialNumber: req.body.serialNumber,
		dateOfInstall: req.body.dateOfInstall,
		address: req.body.address,
		contacts: req.body.contacts,
		description: req.body.description,
		maintenanceSchedule: req.body.mainenanceSchedule,
		nextScheduledDate: req.body.nextScheduledDate,
		createdAt: new Date()
	});
	res.status(201).send();
});

// Delete Assets
router.delete('/:id', async (req, res) => {
	const assets = await loadAssetsCollection();
	await assets.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
	res.status(200).send();
});

// Modify Assets
router.put('/:id', async (req, res) => {
	const assets = await loadAssetsCollection();
	await assets.updateOne(
		{ _id: new mongodb.ObjectID(req.params.id) },
		{ $set: req.body }
	);
	console.log(res);
	res.status(200).send();
});

// Complete Assets
router.put('/:id/complete', async (req, res) => {
	const assets = await loadAssetsCollection();
	await assets.updateOne(
		{ _id: new mongodb.ObjectID(req.params.id) },
		{ $set: { status: 'complete' } }
	);
	res.status(200).send();
});


// Router Connection
async function loadAssetsCollection() {
	const client = await mongodb.MongoClient.connect('mongodb+srv://generic:Password123@cluster0-99drl.mongodb.net/test?retryWrites=true&w=majority', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	return client.db('Maintenance-Program').collection('assets');
}

module.exports = router;

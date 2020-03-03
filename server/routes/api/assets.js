const express = require('express');
const dotenv = require('dotenv');
const { getAssets, addAsset, getAsset, updateAsset, deleteAsset } = require('../../controllers/assetController');

const router = express.Router();

dotenv.config({ path: './server/config/config.env' });

// Main Asset Endpoints

router
	.route('/')
	.get(getAssets)
	.post(addAsset)

router
	.route('/:id')
	.get(getAsset)
	.delete(deleteAsset)
	.put(updateAsset)

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

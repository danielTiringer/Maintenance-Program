const express = require('express');
const dotenv = require('dotenv');
const {
	getAssets,
	addAsset,
	getAsset,
	updateAsset,
	deleteAsset,
	addMaintenance,
	updateMaintenance
} = require('../../controllers/assetController');
// const { addMaintenance, updateMaintenance } = require('../../controllers/maintenanceController');

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

// Asset Maintenance Endpoints

router
	.route('/:id/maintenance')
	.post(addMaintenance)

router
	.route('/:id/maintenance/:position')
	.put(updateMaintenance)

module.exports = router;

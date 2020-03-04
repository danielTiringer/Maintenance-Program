const express = require('express');
const {
	getAssets,
	addAsset,
	getAsset,
	updateAsset,
	deleteAsset,
	addMaintenance,
	updateMaintenance
} = require('../../controllers/assetController');

const router = express.Router();

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

const express = require('express');
const router = express.Router();
const {
	getClients,
	addClient,
	getClient,
	deleteClient,
	updateClient,
	addContact,
	deleteContact,
	updateContact
} = require('../../controllers/clientController');

// Main Client Endpoints

router
	.route('/')
	.get(getClients)
	.post(addClient)

router
	.route('/:id')
	.get(getClient)
	.delete(deleteClient)
	.put(updateClient)

// Client Contact Endpoints

router
	.route('/:id/contact')
	.post(addContact)

router
	.route('/:id/contact/:position')
	.put(updateContact)
	.delete(deleteContact)

module.exports = router;

const express = require('express');
const mongodb = require('mongodb');
const dotenv = require('dotenv');

const router = express.Router();

dotenv.config();


// Main Client Endpoints

// Get Clients

router.get('/', async (req, res) => {
	const clients = await loadClientsCollection();
	res.send(await clients.find({}).toArray());
})

// Add Client
router.post('/', async (req, res) => {
	const clients = await loadClientsCollection();
	await clients.insertOne({
		name: req.body.name,
		contacts: [],
		createdAt: new Date()
	});
	res.status(201).send();
});

// Get Single Client
router.get('/:id', async (req, res) => {
	const clients = await loadClientsCollection();
	res.send(await clients.findOne({ _id: new mongodb.ObjectID(req.params.id) }))
});

// Delete Client
router.delete('/:id', async (req, res) => {
	const clients = await loadClientsCollection();
	await clients.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
	res.status(200).send();
});

// Modify Client
router.put('/:id', async (req, res) => {
	const clients = await loadClientsCollection();
	await clients.updateOne(
		{ _id: new mongodb.ObjectID(req.params.id) },
		{ $set: req.body }
	);
	res.status(200).send();
});


// Asset Contact Endpoints

// Add Contact
router.post('/:id/contact', async (req, res) => {
	const clients = await loadClientsCollection();
	await clients.updateOne(
		{ _id: new mongodb.ObjectID(req.params.id) },
		{
			$push: {
				contacts: {
					$each: [{
						name: req.body.name,
						title: req.body.title || '',
						zip: req.body.zip,
						city: req.body.city,
						address: req.body.address,
						phone: req.body.phone,
						email: req.body.email,
						createdAt: new Date()
					}],
					$position: 0
				},
			}
		}
	);
	res.status(201).send();
})

// Delete Contact
router.delete('/:id/contact/:position', async (req, res) => {
	const clients = await loadClientsCollection();
	await clients.updateOne(
		{ _id: new mongodb.ObjectID(req.params.id) },
		{ $unset : { [`contacts.${req.params.position}`] : 1 } },
	);
	await clients.updateOne(
		{ _id: new mongodb.ObjectID(req.params.id) },
		{ $pull : {"contacts" : null } }
	);
	res.status(200).send();
})

// Update Contact
router.put('/:id/contact/:position', async (req, res) => {
	const clients = await loadClientsCollection();
	await clients.updateOne(
		{ _id: new mongodb.ObjectID(req.params.id) },
		{ $set: { [`contacts.${req.params.position}`]: req.body } }
	);
	res.status(200).send();
});


// Router Connection
async function loadClientsCollection() {
	const client = await mongodb.MongoClient.connect(process.env.DB_HOST, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	return client.db('Maintenance-Program').collection('clients');
}

module.exports = router;

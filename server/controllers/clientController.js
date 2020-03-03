const Client = require('../models/Client');

// Get Clients
// @route   GET api/clients
// @desc    Register a new user
// @access  Public

exports.getClients = (req, res) => {
	Client.find()
		.sort({ dateOfInstall: 1 })
		.then(clients => res.status(200).json({
			success: true,
			data: clients
		}))
		.catch(err => res.status(400).json({
			success: false,
			message: err
		}))
}

// @route   POST api/clients/register
// @desc    Add a new client
// @access  Public
exports.addClient = (req, res) => {
	const newClient = new Client({
		name: req.body.name,
		contacts: [],
		createdAt: new Date()
	});

	newClient.save()
		.then(client => res.status(201).json({
			success: true,
			data: client
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
}

// @route   GET api/clients/:id
// @desc    Get a single client
// @access  Public
exports.getClient = (req, res) => {
	Client.findById(req.params.id)
		.then(client => res.status(200).json({
			success: true,
			data: client
		}))
		.catch(err => res.status(404).json({
			success: false,
			message: err
		}))
};

// @route   DELETE api/clients/:id
// @desc    Delete a client
// @access  Public
exports.deleteClient = (req, res) => {
	Client.findById(req.params.id)
		.then(client => client.remove()
		.then(() => res.json({
			success: true,
			data: {}
		})))
		.catch(err => res.status(404).json({
			success: false,
			message: err
		}))
};

// @route   PUT api/clients/:id
// @desc    Update client
// @access  Public
exports.updateClient = (req, res) => {
	Client.updateOne(
		{ _id: req.params.id },
		{ $set: req.body },
		{ runValidators: true }
	)
		.then(client => res.status(200).json({
			success: true,
			data: client
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



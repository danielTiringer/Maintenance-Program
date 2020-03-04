const Client = require('../models/Client');

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
		.then(item =>
		res.status(200).json({
			success: true,
			data: item
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

// @route   POST api/clients/:id/contact
// @desc    Add a new contact
// @access  Public
// eslint-disable-next-line
exports.addContact = (req, res) => {
	Client.updateOne(
		{ _id: req.params.id },
		// { runValidators: true },
		{
			$push: {
				contacts: {
					$each: [{
						name: req.body.name,
						title: req.body.title,
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
}

// @route   DELETE api/clients/:id/contact/:contactId
// @desc    Add a new client
// @access  Public
exports.deleteContact = (req, res) => {
	Client.updateOne(
		{ _id: req.params.id },
		{ $pull: { contacts: { 'contacts._id': req.params.contactId }}}
	)
		.then(item =>
			res.status(200).json({
				success: true,
				data: item
			})
		)
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

// @route   PUT api/clients/:id/contact/:contactId
// @desc    Update contact
// @access  Public
exports.updateContact = (req, res) => {
	Client.updateOne(
		{ '_id': req.params.id, 'contacts.id': req.params.contactId },
		{ $set: {
			'contacts.$.name': req.body.name,
			'contacts.$.title': req.body.title,
			'contacts.$.zip': req.body.zip,
			'contacts.$.city': req.body.city,
			'contacts.$.address': req.body.address,
			'contacts.$.email': req.body.email,
			'contacts.$.phone': req.body.phone
		}})
			.then(item =>
				res.status(200).json({
					success: true,
					data: item
				})
			)
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

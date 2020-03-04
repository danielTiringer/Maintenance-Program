process.env.NODE_ENV = 'test';
// Synchronize tests between local computer and MongoDB Atlas.
process.env.TZ = 'Europe/London';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../../server/app.js');
const conn = require('../../../../server/config/db.js');

describe('PUT /api/clients/:id/contact/:position', function() {
	// eslint-disable-next-line mocha/no-hooks-for-single-case
	before(async function() {
		await conn.connect()
			// .then(() => console.log('MongoMemory connected.'))
			.catch((err) => console.log(err));
	})

	// eslint-disable-next-line mocha/no-hooks-for-single-case
	after(async function() {
		await conn.close()
			// .then(() => console.log('MongoMemory disconnected.'))
			.catch((err) => console.log(err));
	})

	it('OK, updates fields as expected.', function(done) {
		request(app).post('/api/clients')
			.send({
				'name': 'Tesco'
			})
			.then(response => {
				request(app).post(`/api/clients/${response.body.data._id}/contact`)
					.send({
						'name': 'Test User',
						'title': 'Software Developer',
						'zip': 6442,
						'city': 'Testcity',
						'address': 'Teststreet 17',
						'phone': '06-30-000-0000',
						'email': 'test@gmail.com'
					})
						.then(() => {
							request(app).put(`/api/clients/${response.body.data._id}/contact/0`)
							.send({
								'name': 'Updated User',
								'title': 'Software Developer',
								'zip': 6442,
								'city': 'Testcity',
								'address': 'UpdatedStreet 17',
								'phone': '06-30-000-0000',
								'email': 'test@gmail.com'
							})
							.then(() => {
								request(app).get(`/api/clients/${response.body.data._id}`)
									.then(getResponse => {
										expect(getResponse.body.data.contacts.length).to.equal(1)
										expect(getResponse.body.data.contacts[0].name).to.equal('Updated User')
										expect(getResponse.body.data.contacts[0].title).to.equal('Software Developer')
										expect(getResponse.body.data.contacts[0].zip).to.equal(6442)
										expect(getResponse.body.data.contacts[0].city).to.equal('Testcity')
										expect(getResponse.body.data.contacts[0].address).to.equal('UpdatedStreet 17')
										expect(getResponse.body.data.contacts[0].phone).to.equal('06-30-000-0000')
										expect(getResponse.body.data.contacts[0].email).to.equal('test@gmail.com')
										done();
									})
							})
						})
			})
			.catch((err) => done(err));
	})
})




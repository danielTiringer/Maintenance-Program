process.env.NODE_ENV = 'test';
// Synchronize tests between local computer and MongoDB Atlas.
process.env.TZ = 'Europe/London';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../../server/app.js');
const conn = require('../../../../server/config/db.js');

describe('DELETE /api/clients/:id/contacts', function() {
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

	it('OK, added client has the correct fields and status code.', function(done) {
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
						request(app).get(`/api/clients/${response.body.data._id}`)
							.then(addResponse => {
								request(app).delete(`/api/clients/${response.body.data._id}/contact/${addResponse.body.data.contacts[0]._id}`)
							.then((deleteResponse) => {
								expect(deleteResponse).to.be.an('object');
								expect(deleteResponse.status).to.equal(200);
								expect(deleteResponse.body.success).to.equal(true);
								expect(deleteResponse.body.data.nModified).to.equal(1);
								request(app).get(`/api/clients/${response.body.data._id}`)
									.then(finalResponse => {
										expect(finalResponse).to.be.an('object');
										expect(finalResponse.status).to.equal(200);
										expect(finalResponse.body.success).to.equal(true);
										expect(finalResponse.body.data.contacts.length).to.equal(0);
										done();
									})
								})
						})
					})
			})
			.catch((err) => done(err));
	})

	it('OK, deleting an ID that does not exist returns 0 items changed.', function(done) {
		request(app).post('/api/clients')
			.send({
				'name': 'Tesco'
			})
			.then(response => {
				request(app).delete(`/api/clients/${response.body.data._id}/contact/5e5f8c392366299bf8a4561a`)
			.then(deleteResponse => {
				expect(deleteResponse).to.be.an('object');
				expect(deleteResponse.status).to.equal(200);
				expect(deleteResponse.body.success).to.equal(true);
				expect(deleteResponse.body.data.nModified).to.equal(0);
				done();
				})
			.catch((err) => done(err));
		})
	})
})

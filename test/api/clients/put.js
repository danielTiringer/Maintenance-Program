process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server/app.js');
const conn = require('../../../server/config/db.js');

describe('PUT /api/clients', function() {
	before(async function() {
		await conn.connect()
			// .then(() => console.log('MongoMemory connected.'))
			.catch((err) => console.log(err));
	})

	after(async function() {
		await conn.close()
			// .then(() => console.log('MongoMemory disconnected.'))
			.catch((err) => console.log(err));
	})

	it('OK, updates record when all fields are present.', function(done) {
		request(app).post('/api/clients')
			.send({
				'name': 'Tesco'
			})
			.then(res => {
				request(app).put(`/api/clients/${res.body.data._id}`)
					.send({
						'name': 'Spar'
					})
					.then(response => {
						expect(response.status).to.equal(200);
						expect(response.body.success).to.equal(true);
					})
						.then(() => {
							request(app).get(`/api/clients/${res.body.data._id}`)
								.then(singleResponse => {
									expect(singleResponse.status).to.equal(200);
									expect(singleResponse.body.success).to.equal(true);
									expect(singleResponse.body.data).to.be.an('object');
									expect(singleResponse.body.data.name).to.equal('Spar');
									done();
								})

						})
						.catch((err) => done(err));
			})
	})

	it('Fail, all values are needed in order to process the update.', function(done) {
		request(app).post('/api/clients')
			.send({
				'name': 'Tesco',
			})
			.then(res => {
				request(app).put(`/api/clients/${res.body.data._id}`)
					.send({
						'name': '',
					})
					.then(response => {
						expect(response.status).to.equal(400);
						expect(response.body.success).to.equal(false);
						expect(response.body.error).to.include('Please add the Client Name.');
						done();
					})
					.catch((err) => done(err));
			})
	})

	it('Fail, client name has to be at least 3 characters long.', function(done) {
		request(app).post('/api/clients')
			.send({
				'name': 'Tesco',
			})
			.then(res => {
				request(app).put(`/api/clients/${res.body.data._id}`)
					.send({
						'name': 'Te',
					})
					.then(response => {
						expect(response.status).to.equal(400);
						expect(response.body.success).to.equal(false);
						expect(response.body.error).to.include('Path `name` (`Te`) is shorter than the minimum allowed length (3).');
						done();
					})
					.catch((err) => done(err));
			})
	})
})



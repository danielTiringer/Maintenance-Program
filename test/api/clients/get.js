process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server/app.js');
const conn = require('../../../server/config/db.js');

describe('GET /api/clients', function() {
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

	it('OK, getting items show no clients.', function(done) {
		request(app).get('/api/clients')
			.then(res => {
				expect(res.status).to.equal(200);
				expect(res.body.data.length).to.equal(0);
				done();
			})
			.catch((err) => done(err));
	})

	it('OK, getting items has 1 item.', function(done) {
		request(app).post('/api/clients')
			.send({
				'name': 'Tesco',
			})
			.then(res => {
				request(app).get(`/api/clients/${res.body.data._id}`)
				.then(response => {
					expect(response.status).to.equal(200);
					expect(response.body.success).to.equal(true);
					expect(response.body.data).to.be.an('object');
					done();
				})
			})
			.catch((err) => done(err));
	})

	it('OK, single GET request return the correct client.', function(done) {
		request(app).post('/api/clients')
			.send({
				'name': 'Tesco',
			})
			.then(res => {
				request(app).get(`/api/clients/${res.body.data._id}`)
					.then(response => {
						expect(response.status).to.equal(200);
						expect(response.body.success).to.equal(true);
						expect(response.body.data).to.be.an('object');
						done();
					})
				})
				.catch((err) => done(err));
	})

})


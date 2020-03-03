process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server/app.js');
const conn = require('../../../server/config/db.js');

describe('DELETE /api/assets', function() {
	before(async function() {
		await conn.connect()
			.then(() => console.log('MongoMemory connected.'))
			.catch((err) => console.log(err));
	})

	after(async function() {
		await conn.close()
			.then(() => console.log('MongoMemory disconnected.'))
			.catch((err) => console.log(err));
	})

	it('OK, deleting removes the asset.', function(done) {
		request(app).post('/api/assets')
			.send({
				"assetId": "door452",
				"serialNumber": "bestdoor999",
				"dateOfInstall": "2017/01/24",
				"zip": "2030",
				"city": "Erd",
				"address": "Bella u. 8",
				"description": "Back door of the supermarket",
				"maintenanceSchedule": "annual",
				"nextScheduledDate": "2020/02/28"
			})
			.then((res) => {
				request(app).delete(`/api/assets/${res.body.data._id}`)
				.then((res) => {
					expect(res.status).to.equal(200);
					expect(res.body.success).to.equal(true);
					expect(res.body.data).to.be.an('object');
					expect(Object.keys(res.body.data).length).to.equal(0);

					request(app).get('/api/assets')
						.then((res) => {
							expect(res.status).to.equal(200);
							expect(res.body.data.length).to.equal(0);
							done();
					})
				})
			})
			.catch((err) => done(err));
	})

	it('OK, deleting an invalid id gives a cast error.', function(done) {
	request(app).delete('/api/assets/111')
		.then((res) => {
			expect(res.status).to.equal(404);
			expect(res.body.success).to.equal(false);
			expect(res.body.message).to.be.an('object');
			expect(res.body.message.name).to.equal('CastError');
			done();
		})
		.catch((err) => done(err));
	})

	it(`OK, deleting valid id that doesn't exist gives an error.`, function(done) {
	request(app).delete('/api/assets/5e5cfee3747654339f5ecb77')
		.then((res) => {
			expect(res.status).to.equal(404);
			expect(res.body.success).to.equal(false);
			expect(res.body.message).to.be.an('object');
			expect(Object.keys(res.body.message).length).to.equal(0);
			done();
		})
		.catch((err) => done(err));
	})

})


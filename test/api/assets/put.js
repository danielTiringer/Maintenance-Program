process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server/app.js');
const conn = require('../../../server/config/db.js');

describe('PUT /api/assets', function() {
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
			.then(res => {
				request(app).put(`/api/assets/${res.body.data._id}`)
					.send({
						"assetId": "door123",
						"serialNumber": "bestdoor999",
						"dateOfInstall": "2017/01/24",
						"zip": "2030",
						"city": "Erd",
						"address": "Bella u. 8",
						"description": "Back door of the supermarket",
						"maintenanceSchedule": "semi-annual",
						"nextScheduledDate": "2020/02/28"
					})
					.then(response => {
						expect(response.status).to.equal(200);
						expect(response.body.success).to.equal(true);
						done();
					})
					.catch((err) => done(err));
			})
	})

	it('Fail, all values are needed in order to process the update.', function(done) {
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
			.then(res => {
				request(app).put(`/api/assets/${res.body.data._id}`)
					.send({
						"assetId": "door123",
						"serialNumber": "bestdoor999",
						"dateOfInstall": "2017/01/24",
						"zip": "2030",
						"city": "Erd",
						"address": "Bella u. 8",
						"description": "Back door of the supermarket",
						"maintenanceSchedule": "",
						"nextScheduledDate": "2020/02/28"
					})
					.then(response => {
						expect(response.status).to.equal(400);
						expect(response.body.success).to.equal(false);
						expect(response.body.error).to.include('Please add the Maintenance Schedule.');
						done();
					})
					.catch((err) => done(err));
			})
	})
})


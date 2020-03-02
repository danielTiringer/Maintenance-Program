process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server/app.js');
const conn = require('../../../server/config/db.js');

describe('POST /api/assets', function() {
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

	it('OK, new asset has correct fields and status code.', function(done) {
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
				expect(res.status).to.equal(201)
				expect(res.body.success).to.equal(true)
				expect(res.body.data).to.contain.property('_id');
				expect(res.body.data).to.contain.property('assetId');
				expect(res.body.data).to.contain.property('serialNumber');
				expect(res.body.data).to.contain.property('dateOfInstall');
				expect(res.body.data).to.contain.property('zip');
				expect(res.body.data).to.contain.property('city');
				expect(res.body.data).to.contain.property('address');
				expect(res.body.data).to.contain.property('description');
				expect(res.body.data).to.contain.property('maintenanceSchedule');
				expect(res.body.data).to.contain.property('nextScheduledDate');
				expect(res.body.data.maintenanceLog.length).to.equal(0);
				expect(res.body.data).to.contain.property('date');
				done();
			})
			.catch((err) => done(err));
	})

	it('Fail, asset requires values. Displays correct errors.', function(done) {
		request(app).post('/api/assets')
			.send({
				"description": "Back door of the supermarket",
				"maintenanceSchedule": "annual",
				"nextScheduledDate": "2020/02/28"
			})
			.then((res) => {
				expect(res.status).to.equal(400);
				expect(res.body.success).to.equal(false);
				expect(res.body.message.errors.assetId.message).to.equal('Please add the Asset ID.');
				expect(res.body.message.errors.serialNumber.message).to.equal('Please add the Serial Number.');
				expect(res.body.message.errors.dateOfInstall.message).to.equal('Please add the Date of Install.');
				expect(res.body.message.errors.zip.message).to.equal('Please add the Postal Code.');
				expect(res.body.message.errors.city.message).to.equal('Please add the City.');
				expect(res.body.message.errors.address.message).to.equal('Please add the Address.');
				done();
			})
			.catch((err) => done(err));
	})

})

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
				expect(res).to.be.an('object')
				expect(res.status).to.equal(201)
				expect(res.body.success).to.equal(true)
				expect(res.body.data).to.contain.property('_id');
				expect(res.body.data).to.contain.property('assetId');
				expect(res.body.data.assetId).to.equal('door452');
				expect(res.body.data).to.contain.property('serialNumber');
				expect(res.body.data.serialNumber).to.equal('bestdoor999');
				expect(res.body.data).to.contain.property('dateOfInstall');
				expect(res.body.data.dateOfInstall.substring(0, 10)).to.equal('2017-01-23');
				expect(res.body.data).to.contain.property('zip');
				expect(res.body.data.zip).to.equal(2030);
				expect(res.body.data).to.contain.property('city');
				expect(res.body.data.city).to.equal('Erd');
				expect(res.body.data).to.contain.property('address');
				expect(res.body.data.address).to.equal('Bella u. 8');
				expect(res.body.data).to.contain.property('description');
				expect(res.body.data.description).to.equal('Back door of the supermarket');
				expect(res.body.data).to.contain.property('maintenanceSchedule');
				expect(res.body.data.maintenanceSchedule).to.equal('annual');
				expect(res.body.data).to.contain.property('nextScheduledDate');
				expect(res.body.data.nextScheduledDate.substring(0, 10)).to.equal('2020-02-27');
				expect(res.body.data.maintenanceLog).to.be.an('array');
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
				expect(res.body.error).to.be.an('array').that.includes('Please add the Asset ID.');
				expect(res.body.error).to.include('Please add the Serial Number.');
				expect(res.body.error).to.include('Please add the Date of Install.');
				expect(res.body.error).to.include('Please add the Postal Code.');
				expect(res.body.error).to.include('Please add the City.');
				expect(res.body.error).to.include('Please add the Address.');
				done();
			})
			.catch((err) => done(err));
	})

	it('Fail, maintenance schedule has to be annual or semi-annual.', function(done) {
		request(app).post('/api/assets')
			.send({
				"assetId": true,
				"serialNumber": "bestdoor999",
				"dateOfInstall": "2017/01/24",
				"zip": "2030",
				"city": "Erd",
				"address": "Bella u. 8",
				"description": "Back door of the supermarket",
				"maintenanceSchedule": "weekly",
				"nextScheduledDate": "2020/02/28"
			})
			.then((res) => {
				expect(res.status).to.equal(400);
				expect(res.body.error).to.include('`weekly` is not a valid enum value for path `maintenanceSchedule`.');
				done();
			})
			.catch((err) => done(err));
	})

	it('Fail, zip code has to be 4 digits long.', function(done) {
		request(app).post('/api/assets')
			.send({
				"assetId": true,
				"serialNumber": "bestdoor999",
				"dateOfInstall": "2017/01/24",
				"zip": "20301",
				"city": "Erd",
				"address": "Bella u. 8",
				"description": "Back door of the supermarket",
				"maintenanceSchedule": "annual",
				"nextScheduledDate": "2020/02/28"
			})
			.then((res) => {
				expect(res.status).to.equal(400);
				expect(res.body.error).to.include('Path `zip` (20301) is more than maximum allowed value (9999).');
				done();
			})
			.catch((err) => done(err));
	})

})

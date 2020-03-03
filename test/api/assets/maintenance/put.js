process.env.NODE_ENV = 'test';
// Synchronize tests between local computer and MongoDB Atlas.
process.env.TZ = 'Europe/London';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../../server/app.js');
const conn = require('../../../../server/config/db.js');

describe('PUT /api/assets/:id/maintenance/:position', function() {
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

	it('OK, updates maintenance to correct fields.', function(done) {
		request(app).post('/api/assets')
			.send({
				'assetId': 'door452',
				'serialNumber': 'bestdoor999',
				'dateOfInstall': '2017/01/24',
				'zip': '2030',
				'city': 'Erd',
				'address': 'Bella u. 8',
				'description': 'Back door of the supermarket',
				'maintenanceSchedule': 'annual',
				'nextScheduledDate': '2020/02/28'
			})
			.then(response => {
				request(app).post(`/api/assets/${response.body.data._id}/maintenance`)
					.send({
						'date': '2020/01/20',
						'errorDescription': 'Broken glass.',
						'maintenanceDescription': '',
						'completed': false
					})
						.then(() => {
							request(app).put(`/api/assets/${response.body.data._id}/maintenance/0`)
							.send({
								'date': '2020/01/20',
								'errorDescription': 'Broken glass.',
								'maintenanceDescription': 'Replaced glass.',
								'completed': true
							})
								.then(() => {
									request(app).get(`/api/assets/${response.body.data._id}`)
										.then(getResponse => {
											expect(getResponse.body.data.maintenanceLog.length).to.equal(1)
											expect(getResponse.body.data.maintenanceLog[0].date.substring(0, 10)).to.equal('2020-01-20')
											expect(getResponse.body.data.maintenanceLog[0].errorDescription).to.equal('Broken glass.')
											expect(getResponse.body.data.maintenanceLog[0].maintenanceDescription).to.equal('Replaced glass.')
											expect(getResponse.body.data.maintenanceLog[0].completed).to.equal(true)
											done();
										})
								})
						})
			})
			.catch((err) => done(err));
	})

})



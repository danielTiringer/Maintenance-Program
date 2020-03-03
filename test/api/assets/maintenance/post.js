process.env.NODE_ENV = 'test';
// Synchronize tests between local computer and MongoDB Atlas.
process.env.TZ = 'Europe/London';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../../server/app.js');
const conn = require('../../../../server/config/db.js');

describe('POST /api/assets/:id/maintenance', function() {
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

	it('OK, added maintenance has the correct fields and status code.', function(done) {
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
						.then(res => {
							expect(res).to.be.an('object')
							expect(res.status).to.equal(201)
							expect(res.body.success).to.equal(true)
							expect(res.body.data).to.contain.property('nModified');
							expect(res.body.data.nModified).to.equal(1);
						})
							.then(() => {
								request(app).get(`/api/assets/${response.body.data._id}`)
									.then(getResponse => {
										expect(getResponse.body.data.maintenanceLog.length).to.equal(1)
										expect(getResponse.body.data.maintenanceLog[0].date.substring(0, 10)).to.equal('2020-01-20')
										expect(getResponse.body.data.maintenanceLog[0].errorDescription).to.equal('Broken glass.')
										expect(getResponse.body.data.maintenanceLog[0].maintenanceDescription).to.equal('')
										expect(getResponse.body.data.maintenanceLog[0].completed).to.equal(false)
										done();
									})
							})
			})
			.catch((err) => done(err));
	})

})


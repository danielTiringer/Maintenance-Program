process.env.NODE_ENV = 'test';
// Synchronize tests between local computer and MongoDB Atlas.
process.env.TZ = 'Europe/London';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server/app.js');
const conn = require('../../../server/config/db.js');

describe('POST /api/clients', function() {
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

	it('OK, new client has correct fields and status code.', function(done) {
		request(app).post('/api/clients')
			.send({
				'name': 'Tesco',
			})
			.then((res) => {
				expect(res).to.be.an('object')
				expect(res.status).to.equal(201)
				expect(res.body.success).to.equal(true)
				expect(res.body.data).to.contain.property('_id');
				expect(res.body.data).to.contain.property('name');
				expect(res.body.data.name).to.equal('Tesco');
				expect(res.body.data).to.contain.property('date');
				done();
			})
			.catch((err) => done(err));
	})

	it('Fail, client requires values. Displays correct errors.', function(done) {
		request(app).post('/api/clients')
			.send()
			.then((res) => {
				expect(res.status).to.equal(400);
				expect(res.body.success).to.equal(false);
				expect(res.body.error).to.be.an('array').that.includes('Please add the Client Name.');
				done();
			})
			.catch((err) => done(err));
	})
})


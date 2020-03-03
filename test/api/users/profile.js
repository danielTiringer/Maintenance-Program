process.env.NODE_ENV = 'test';
// Synchronize tests between local computer and MongoDB Atlas.
process.env.TZ = 'Europe/London';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server/app.js');
const conn = require('../../../server/config/db.js');

describe('GET /api/users/profile', function() {
	// eslint-disable-next-line
	before(async function() {
		await conn.connect()
			// .then(() => console.log('MongoMemory connected.'))
			.catch((err) => console.log(err));
	})

	// eslint-disable-next-line
	after(async function() {
		await conn.close()
			// .then(() => console.log('MongoMemory disconnected.'))
			.catch((err) => console.log(err));
	})

	it('OK, logged in user can get profile details.', function(done) {
		request(app).post('/api/users/register')
			.send({
				'name': 'Test User',
				'username': 'testuser',
				'email': 'testuser@gmail.com',
				'password': 'Test1234',
				'confirm_password': 'Test1234'
			})
			.then(() => {
				request(app).post('/api/users/login')
					.send({
						'email': 'testuser@gmail.com',
						'password': 'Test1234',
					})
					.then(res => {
						request(app).get(`/api/users/profile`)
						.set('Authorization', res.body.token)
						.send()
							.then(response => {
								expect(response).to.be.an('object');
								expect(response.status).to.equal(200);
								expect(response.body.success).to.equal(true);
								expect(response.body.user.name).to.equal('Test User');
								expect(response.body.user.email).to.equal('testuser@gmail.com');
								done();
							})
					})
			})
			.catch((err) => done(err));
	})

	it('Fail, cannot get profile without auth token.', function(done) {
		request(app).post('/api/users/register')
			.send({
				'name': 'Test User 2',
				'username': 'testuser 2',
				'email': 'testuser2@gmail.com',
				'password': 'Test1234',
				'confirm_password': 'Test1234'
			})
			.then(() => {
				request(app).get('/api/users/profile')
					.send()
					.then(res => {
						expect(res).to.be.an('object');
						expect(res.status).to.equal(401);
						done();
					})
			})
			.catch((err) => done(err));
	})

	it('Fail, cannot get profile with invalid auth token.', function(done) {
		request(app).post('/api/users/register')
			.send({
				'name': 'Test User 3',
				'username': 'testuser 3',
				'email': 'testuser3@gmail.com',
				'password': 'Test1234',
				'confirm_password': 'Test1234'
			})
			.then(() => {
				request(app).get('/api/users/profile')
					.set('Authorization', 'Bearer mocktoken')
					.send()
					.then(res => {
						expect(res).to.be.an('object');
						expect(res.status).to.equal(401);
						done();
					})
			})
			.catch((err) => done(err));
	})
})



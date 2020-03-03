process.env.NODE_ENV = 'test';
// Synchronize tests between local computer and MongoDB Atlas.
process.env.TZ = 'Europe/London';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server/app.js');
const conn = require('../../../server/config/db.js');

describe('POST /api/users/login', function() {
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

	it('OK, successfully logged in registered user.', function(done) {
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
						expect(res).to.be.an('object');
						expect(res.status).to.equal(200);
						expect(res.body.success).to.equal(true);
						expect(res.body.user.name).to.equal('Test User');
						expect(res.body.user.email).to.equal('testuser@gmail.com');
						expect(res.body.user.password).to.have.length.above(20);
						expect(res.body.token).to.include('Bearer');
						done();
					})
			})
			.catch((err) => done(err));
	})

	it('Fail, unsuccessful login with wrong password and correct email.', function(done) {
		request(app).post('/api/users/register')
			.send({
				'name': 'Test User 2',
				'username': 'testuser 2',
				'email': 'testuser2@gmail.com',
				'password': 'Test1234',
				'confirm_password': 'Test1234'
			})
			.then(() => {
				request(app).post('/api/users/login')
					.send({
						'email': 'testuser2@gmail.com',
						'password': 'Test2345',
					})
					.then(res => {
						expect(res).to.be.an('object');
						expect(res.status).to.equal(404);
						expect(res.body.success).to.equal(false);
						expect(res.body.message).to.equal('Incorrect password.');
						done();
					})
			})
			.catch((err) => done(err));
	})

	it('Fail, unsuccessful login with wrong email.', function(done) {
		request(app).post('/api/users/register')
			.send({
				'name': 'Test User 3',
				'username': 'testuser 3',
				'email': 'testuser3@gmail.com',
				'password': 'Test1234',
				'confirm_password': 'Test1234'
			})
			.then(() => {
				request(app).post('/api/users/login')
					.send({
						'email': 'wrongemail@gmail.com',
						'password': 'Test1234',
					})
					.then(res => {
						expect(res).to.be.an('object');
						expect(res.status).to.equal(404);
						expect(res.body.success).to.equal(false);
						expect(res.body.message).to.equal('Email not found.');
						done();
					})
			})
			.catch((err) => done(err));
	})
})


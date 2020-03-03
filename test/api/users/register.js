process.env.NODE_ENV = 'test';
// Synchronize tests between local computer and MongoDB Atlas.
process.env.TZ = 'Europe/London';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server/app.js');
const conn = require('../../../server/config/db.js');

describe('POST /api/users/register', function() {
	// eslint-disable-next-line
	before(async function() {
		await conn.connect()
			.then(() => console.log('MongoMemory connected.'))
			.catch((err) => console.log(err));
	})

	// eslint-disable-next-line
	after(async function() {
		await conn.close()
			.then(() => console.log('MongoMemory disconnected.'))
			.catch((err) => console.log(err));
	})

	it('OK, successfully register with proper data.', function(done) {
		request(app).post('/api/users/register')
			.send({
				"name": "Test User",
				"username": "testuser",
				"email": "testuser@gmail.com",
				"password": "Test1234",
				"confirm_password": "Test1234"
			})
			.then((res) => {
				expect(res).to.be.an('object')
				expect(res.status).to.equal(201)
				expect(res.body.success).to.equal(true)
				expect(res.body).to.contain.property('message');
				expect(res.body.message).to.equal('User registered.');
				done();
			})
			.catch((err) => done(err));
	})

	it(`Fail, register error if passwords don't match.`, function(done) {
		request(app).post('/api/users/register')
			.send({
				"name": "Test User 2",
				"username": "testuser2",
				"email": "testuser2@gmail.com",
				"password": "Test1234",
				"confirm_password": "Test2345"
			})
			.then((res) => {
				expect(res).to.be.an('object')
				expect(res.status).to.equal(400)
				expect(res.body.success).to.equal(false)
				expect(res.body.message).to.equal('The passwords did not match!');
				done();
			})
			.catch((err) => done(err));
	})

	it(`Fail, register error if username already in use.`, function(done) {
		request(app).post('/api/users/register')
			.send({
				"name": "Test User 3",
				"username": "testuser3",
				"email": "testuser3@gmail.com",
				"password": "Test1234",
				"confirm_password": "Test1234"
			})
			.then(() => {
				request(app).post('/api/users/register')
					.send({
						"name": "Test User 4",
						"username": "testuser3",
						"email": "testuser4@gmail.com",
						"password": "Test1234",
						"confirm_password": "Test1234"
					})
					.then(res => {
						expect(res).to.be.an('object');
						expect(res.status).to.equal(400);
						expect(res.body.success).to.equal(false);
						expect(res.body.error.length).to.equal(1);
						expect(res.body.error).to.contain('Error, expected `username` to be unique. Value: `testuser3`');
						done();
					})
			})
			.catch((err) => done(err));
	})

	it(`Fail, register error if username already in use.`, function(done) {
		request(app).post('/api/users/register')
			.send({
				"name": "Test User 5",
				"username": "testuser5",
				"email": "testuser5@gmail.com",
				"password": "Test1234",
				"confirm_password": "Test1234"
			})
			.then(() => {
				request(app).post('/api/users/register')
					.send({
						"name": "Test User 6",
						"username": "testuser6",
						"email": "testuser5@gmail.com",
						"password": "Test1234",
						"confirm_password": "Test1234"
					})
					.then(res => {
						expect(res).to.be.an('object')
						expect(res.status).to.equal(400);
						expect(res.body.success).to.equal(false);
						expect(res.body.error.length).to.equal(1);
						expect(res.body.error).to.contain('Error, expected `email` to be unique. Value: `testuser5@gmail.com`');
						done();
					})
			})
			.catch((err) => done(err));
	})
})

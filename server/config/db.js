// Database and mock DB config
const mongoose = require('mongoose');
const mongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
let mongoServer;

const dotenv = require('dotenv')
dotenv.config({ path: './server/config/config.env' })

// Connect to MongoDB
async function connect() {
	if (process.env.NODE_ENV === 'test') {
		mongoServer = new mongoMemoryServer({ debug: true });
		const mongoUri = await mongoServer.getUri();
		await mongoose.connect(mongoUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
			.then((res, err) => {
				if (err) return (err);
			})
	} else {
		await mongoose.connect(process.env.DB_HOST, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
			.then((res, err) => {
				if (err) return (err);
			})
			.catch(err => console.log(err))
	}
}

async function close() {
	if (process.env.NODE_ENV === 'test') {
		await mongoose.disconnect();
		await mongoServer.stop();
	} else {
		return mongoose.disconnect();
	}
}

module.exports = { connect, close };

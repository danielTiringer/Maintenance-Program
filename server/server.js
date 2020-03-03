const app = require('./app.js');
const db = require('./config/db.js');
const dotenv = require('dotenv');
dotenv.config({ path: './server/config/config.env' });
const PORT = process.env.PORT || 5000;

db.connect()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}.`);
			console.log('MongoDB connected.');
		})
	})

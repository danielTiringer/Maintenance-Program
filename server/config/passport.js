const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./../models/User');
const dotenv = require('dotenv');

dotenv.config({ path: './server/config/config.env' });

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET || 'testkey';

module.exports = passport => {
	passport.use(
		new JwtStrategy(options, (jwt_payload, done) => {
			User.findById(jwt_payload._id)
				.then(user => {
					if (user) { return done(null, user) }
					return done(null, false);
				}).catch(err => {
					console.log(err);
				})
		})
	)
}

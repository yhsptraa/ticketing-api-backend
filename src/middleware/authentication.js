const passport = require('passport');
const passportJWT = require('passport-jwt');

const User = require('../models/user');

passport.use(
    'user',
    new passportJWT.Strategy(
        {
            jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
            secretOrKey: process.env.JWT_SECRET || 'SECRET_KEY',
        },
        async (payload, done) => {
            const user = await User.findById(payload.id).select('-password');

            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        }
    )
);

module.exports = passport.authenticate('user', { session: false });

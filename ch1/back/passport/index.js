const passport = require('passport');
const local = require('./localStrategy');
const dotenv = require('dotenv');
dotenv.config(); //LOAD CONFIG

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            return done(null, id);
        } catch (err) {
            console.error(err);
            return done(err);
        }
    });

    local();
};

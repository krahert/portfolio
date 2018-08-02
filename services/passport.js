const passport = require('passport');
const mongoose = require('mongoose');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const hash = require('./bcrypt');

const keys = require('../config/keys');
const User = mongoose.model('user');

//------------------------------------------------------------------------------

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//------------------------------------------------------------------------------

// Config for Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
      // proxy: true
    },

    // Await Google OAuth user data
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      // Verify & retrieve existing user
      if (existingUser) {
        return done(null, existingUser);
      }

      // Create and then retrieve new user
      const user = await new User({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value
      }).save();
      done(null, user);
    }
  )
);

//------------------------------------------------------------------------------

// Login for username + password
const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
  session: true
};

passport.use(
  new LocalStrategy(localOptions, async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false);
    }

    const verifyHash = await hash.compareHash(password, user.passwordHash);

    if (verifyHash) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

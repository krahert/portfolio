const passport = require('passport');
const Authentication = require('../middlewares/localSignup');
const rateLimiter = require('../middlewares/rateLimiter');

const hideUserData = userData => {
  return { _id: userData._id, username: userData.username };
};

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get(
    '/api/current_user',
    rateLimiter({
      expiresSec: 60,
      maxRequests: 10,
      prefix: 'getUserInfo-',
      message: 'Too many user requests, please try again in 1 minute.'
    }),
    (req, res) => {
      if (req.user) {
        res.send(hideUserData(req.user));
      } else {
        res.status(204).send(req.user);
      }
    }
  );

  //----------------------------------------------------------------------------

  // User + Pass Login
  app.post(
    '/api/signin',
    rateLimiter({
      expiresSec: 5 * 60,
      maxRequests: 10,
      prefix: 'login-',
      message: 'Too many login attempts, please try again in 5 minutes.'
    }),
    passport.authenticate('local'),
    async (req, res) => {
      res.send(hideUserData(req.user));
    }
  );

  // User + Pass Register
  app.post(
    '/api/signup',
    rateLimiter({
      expiresSec: 3 * 60 * 60,
      maxRequests: 5,
      prefix: 'signup-',
      message: 'Too many new accounts created in a short time span.'
    }),
    Authentication.signup,
    passport.authenticate('local'),
    (req, res) => {
      res.send(hideUserData(req.user));
    }
  );
};

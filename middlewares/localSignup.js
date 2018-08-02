const mongoose = require('mongoose');
const User = mongoose.model('user');
const hash = require('../services/bcrypt');

// Signup User + Pass
exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  if (!email || !username || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(422).send({ error: 'Email is in use' });
  }

  const hashedPassword = await hash.generateHash(password);

  const user = await new User({
    email: email,
    username: username,
    passwordHash: hashedPassword
  }).save();

  return next();
  // res.status(200).send({ msg: 'Registration was successful!'});
  // next();
};
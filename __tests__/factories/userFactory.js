const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = () => {
  return new User({}).save();
};
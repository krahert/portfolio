const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: { type: String, default: null },
  username: String,
  email: String,
  passwordHash: { type: String, default: null }
});

mongoose.model('user', userSchema);
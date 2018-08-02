const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  user: String,
  userId: String,
  message: String,
  dateCreated: Date
});

module.exports = commentSchema;
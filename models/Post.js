const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = require('./Comment');

const postSchema = new Schema({
  board: String,
  title: String,
  message: String,
  dateCreated: Date,
  dateUpdated: Date,
  // media: { type: String, default: null },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  username: String,
  commentCount: { type: Number, default: 0 },
  comments: [commentSchema]
});

mongoose.model('posts', postSchema);
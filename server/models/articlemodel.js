const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  created_at: Date,
  author: {
    type: String
  },
  imageName: String,
  imageUrl: String,
});

module.exports = mongoose.model('article', articleSchema); // the model
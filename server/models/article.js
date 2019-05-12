const mongoose = require('mongoose')

let articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, `Title required.`],
  },
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  featuredImg: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
  },
  modified: {
    type: Date,
  },
  tags: [String]
})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article
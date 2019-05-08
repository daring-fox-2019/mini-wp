const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
  title: String,
  coverImg: {
    path: String,
    originalName: String
  },
  body: String,
  tags: [{ name: String }],
  authorId: {
    type: String,
    ref: 'user'
  }
}, { timestamps: true })

const Article = mongoose.model('article', articleSchema)

module.exports = Article

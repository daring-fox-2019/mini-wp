const mongoose = require('mongoose')

let articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, `Title required.`],
  },
  description: {
    type: String,
    required: [true, `Description required.`]
  },
  author : {
    type: String
  },
  image: {
    type: String,
  }
},{timestamps:true})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article
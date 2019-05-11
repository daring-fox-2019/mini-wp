const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
// data : title, snippet, content, createdAt, updatedAt, postedAt, userId, status, image

const ArticleSchema = new Schema({
  userId : { type: Schema.Types.ObjectId, ref: 'User' },
  title : String,
  snippet : String,
  content : String,
  createdAt : Date,
  updatedAt : Date,
  postedAt : Date,
  status : String,
  image : String,
})

const Articles = mongoose.model('Article', ArticleSchema)
module.exports = Articles
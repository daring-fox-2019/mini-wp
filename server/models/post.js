const mongoose = require('mongoose')
const Schema = mongoose.Schema

let postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  // image: String
})

let Post = mongoose.model('Posts', postSchema)

module.exports = Post
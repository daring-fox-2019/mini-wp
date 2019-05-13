const mongoose = require('mongoose')
const Schema = mongoose.Schema

let tagSchema = new Schema({
  name: {
    type: String
  }
})

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag
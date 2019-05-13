const mongoose = require('mongoose')

let tagSchema = new mongoose.Schema({
  name: String,
})

let Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag
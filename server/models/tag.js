const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    tagName : String
})


const Tag = mongoose.model('Tag', tagSchema)
module.exports = Tag
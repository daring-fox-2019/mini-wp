const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: Date,
    img: String,
    author: String,
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    tags: [{type:String}]
})

const Blog = mongoose.model('Blog', blogSchema)


module.exports = Blog

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let articleSchema = new Schema({
    title: String,
    content: String,
    created_at: Date,
    status: Boolean,
    author: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    featured_image: String,
    tags: [String]
})

let Article = mongoose.model('Articles', articleSchema)

module.exports = Article
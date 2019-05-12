const mongoose = require('mongoose')
const Schema = mongoose.Schema

let articleSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please fill in the title of your article"]
    },
    content: String,
    image: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: Date,
    tags: []
})

const Article = new mongoose.model("Article", articleSchema)

module.exports = Article
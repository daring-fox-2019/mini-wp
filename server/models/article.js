const mongoose = require("mongoose")
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/mini-wp',{useNewUrlParser : true})


let articleSchema = new Schema({
    title : String,
    description: String,
    author: String,
    content : String,
    created_at: Date,
    image: String,
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

let Article = mongoose.model('article',articleSchema)

module.exports = Article

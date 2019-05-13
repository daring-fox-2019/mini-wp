const mongoose = require("mongoose")
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/mini-wp',{useNewUrlParser : true})

let articleSchema = new Schema({
    title : String,
    description: String,
    content : String,
    created_at: Date,
    image: String
})

let Article = mongoose.model('article',articleSchema)

module.exports = Article
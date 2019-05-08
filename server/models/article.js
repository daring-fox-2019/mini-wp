const mongoose = require("mongoose")
const Schema = mongoose.Schema

mongoose.connect(`mongodb+srv://admin:${process.env.PASSWORD_SERVER}@mini-wp-efobx.gcp.mongodb.net/test?retryWrites=true`,{useNewUrlParser : true})

let articleSchema = new Schema({
    title : String,
    description: String,
    content : String,
    created_at: Date,
    image: String
})

let Article = mongoose.model('article',articleSchema)

module.exports = Article
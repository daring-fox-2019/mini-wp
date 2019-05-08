mongoose = require('mongoose')
require('dotenv').config()

//port = 27017
//dbName = mini-wp
mongoose.connect(process.env.MONGODB_CONNECTION, {useNewUrlParser: true})
const {Schema} = mongoose
const articleSchema = new Schema({
    title:String,
    content:String,
    created_at:Date,
    image:String
})
const Article = mongoose.model('Article', articleSchema)
module.exports = Article
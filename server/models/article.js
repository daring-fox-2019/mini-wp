const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title : {
        type : String,
        required : [true]
    },
    content : {
        type : String,
    },
    image : {
        type : String,
    },
    tags : {
        type : Array
    },
    published : {
        type : Boolean,
        required : [true]
    },
    author : {
        type :  Schema.Types.ObjectId, 
        ref: 'User',
        required : [true]
    }

}, {timestamps : true})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
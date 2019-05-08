const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    title : {
        type : String,
        required : [true, 'Title cannot be empty']
    },
    content : {
        type : String,
        required : [true, 'Content cannot be empty']
    },
    image : {
        type : String
    }, 
    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    tags : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Tag'
    }],
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }]
}, {timestamps : true})


const Article = mongoose.model('Article', articleSchema)
module.exports = Article
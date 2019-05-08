const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content : {
        type : String,
        required : [true, 'Cannot post empty comment!']
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    articleId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Article'
    }
})


const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
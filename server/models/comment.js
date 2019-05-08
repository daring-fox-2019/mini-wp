const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const commentSchema = new Schema({
    content: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Comment must have valid user!']
    }
})

const Comment = mongoose.model('Comment', commentSchema)
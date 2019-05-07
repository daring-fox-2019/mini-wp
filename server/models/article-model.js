const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title : {
        type : String,
        required : [true, 'Please input Title']
    },
    content : {
        type : String
    },
    photo : {
        type : String,
        default : null
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
    like : {
        type : Number,
        default : 0
    },
    tags : [{
        type : Schema.Types.ObjectId,
        ref : 'Tag'
    }],
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
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
    like : [{
        type : Schema.Types.ObjectId,
        ref : 'User',
        default : null
    }],
    tags : [{
        type : Schema.Types.ObjectId,
        ref : 'Tag'
    }],
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
},
{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
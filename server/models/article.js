const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title:{
        type:String,
        required:[true,'judul tidak boleh kosong']
    },
    content:{
        type:String,

    },    
    created_at:String,
    updated_at:String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    featured_image:String
})

const Article = mongoose.model('Article',ArticleSchema)
module.exports = Article
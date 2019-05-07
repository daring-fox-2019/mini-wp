const mongoose = require('mongoose')
const Schema = require('mongoose').Schema
const getSlug = require('../helpers/slugHash')
const articleSchema = new Schema({
    title: {
        type: String,
        default: "Title"
    },
    content: {
        type: String,
        default: "Please write here..."
    },
    created_at: {
        type: Date,
        default: new Date
    },
    featured_image: {
        type: String
    },
    featured_image_name: {
        type: String
    },
    slug: {
        type: String
    },
    author: {type: Schema.Types.ObjectId, ref: 'User'}
})

articleSchema.pre('save', function(next) {
    let title
    if(this.title) {
        title = this.title
    }
    else {
        title = ""
    }
    console.log(this);
    this.slug = getSlug(title)
    next()
})

const Article  = mongoose.model('Article', articleSchema)

module.exports = Article
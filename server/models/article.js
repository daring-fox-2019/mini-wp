const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const {Schema } = mongoose;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    featured_image: {
        type: String,
    },
    created_at: {
        type: Date
    },
    tags : [String],
    author : { type: Schema.Types.ObjectId, ref: 'Member' }
}, {timestamps: true});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article

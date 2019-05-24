const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    subtitle: String,
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    image: String,
    // tags: [{
    //     type: String,
    //     required: [true, 'Tag is required']
    // }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
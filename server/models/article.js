const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const {Schema } = mongoose;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date
    }
});

articleSchema.pre('save', function() {
    this.created_at = new Date
    next()
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article
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
        // required: true
    },
    created_at: {
        type: Date
    },
    tags : [String],
    author : { type: Schema.Types.ObjectId, ref: 'Member' } 
});

articleSchema.pre('save', function() {
    this.created_at = new Date
    next()
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article
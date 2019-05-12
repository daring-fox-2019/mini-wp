const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const articleSchema = new Schema({
    title: String,
    subtitle: String,
    body: String,
    createdAt: Date,
    lastUpdate: Date,
    clap_by: [{type: Schema.Types.ObjectId, ref: 'User'}],
    total_claps: Number, // number of likes
    status: String, //published or drafts
    tags: [{text:String}],
    image: String, //picture url
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

articleSchema.pre('findOneAndUpdate', function(next) {
    if(this._update.clap) {
        return Article.findOne({_id: this._conditions, clap_by: this._update.user})
        .then(found => {
            if(found) next(new Error('claps is found'))
            else next()
        })
    } else if(this._update.unclap) {
        return Article.findOne({_id: this._conditions, clap_by: this._update.user})
        .then(found => {
            if(found) next()
            else next(new Error('claps not found'))
        })
    } else {
        next()
    }
})

const Article = mongoose.model('Article', articleSchema)
module.exports = Article
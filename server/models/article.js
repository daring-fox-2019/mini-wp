const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'required']
  },
  text: String,
  status: Number,
  imageURL: String,
  created: Date,
  updated: Date,
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

articleSchema.post('save', function(doc, next) {
  Article
    .findOne({
      creator: doc.creator
    })
    .populate({
      path: 'creator',
      select: ['_id', 'name', 'email']
    })
    .populate({
      path: 'tags',
    })
    .then(article => {
        doc.creator = article.creator;
        next();
      })
      .catch(err => {
        next(err);
      })
})

let Article = mongoose.model('Article', articleSchema);


module.exports = Article;
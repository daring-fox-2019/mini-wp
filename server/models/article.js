const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema ({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  featuredImage: {
    type: String,
    default: "./src/img/default/default-article-picture.png",
  },
  comments: [{
    type: String,
    default: [],
  }],
  likedBy: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tags: [{
    type: String,
  }],
  isPrivate: {
    type: Boolean,
    required: [true, "isPrivate is required"],
  }
}, { 
  timestamps: true,
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
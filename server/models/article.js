const mongoose = require("mongoose")
const moment = require("moment")
const Schema = mongoose.Schema

let articleSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId, 
        ref : "User"
    },
    image: {
        type: String, 
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    published :{
        type: Number,
        required: true
    },
    published_at:{type: Date}
},{
    timestamps: true
})
let Article = mongoose.model("Article", articleSchema)
articleSchema.pre("save", function(next) {
    if (this.isModified("published")) {
      this.published_at = moment()
    }
    next();
  });
module.exports = Article
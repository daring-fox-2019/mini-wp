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
    published_at:{type: String}
},{
    timestamps: true
})
let Article = mongoose.model("Article", articleSchema)

module.exports = Article
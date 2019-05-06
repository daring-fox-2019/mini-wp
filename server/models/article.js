const mongoose = require("mongoose")
const moment = require("moment")
const Schema = mongoose.Schema

let articleSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref = "User"},
    image: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    tags: {type: Array},
    published: {type: Boolean, required: true}

})
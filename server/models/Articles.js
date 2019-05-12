const mongoose = require('mongoose')
mongoose.connect(process.env.DB_PATH, {
    useNewUrlParser: true
})

const Schema = mongoose.Schema
const articleSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    title: String,
    content: String,
    createdAt: Date,
    image: String,
    status: String
})

const Articles = mongoose.model('Articles', articleSchema)

module.exports = Articles
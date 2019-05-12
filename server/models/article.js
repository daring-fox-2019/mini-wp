const mongoose = require('mongoose')

let Schema = mongoose.Schema

let article = new Schema({
    // user: {
    //   type: Schema.Types.ObjectId, 
    //   ref: 'User'
    // },
    title: {
        type: String,
        required: true
      },
    content: {
        type: String,
        required: true
      },
    created_at: {
      type: Date,
      require: true
    },
    // img: {
    //     type: String,
    //     required: true
    //   }
})

let Articles = mongoose.model('Articles', article)

module.exports = Articles
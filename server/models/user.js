const mongoose = require('mongoose')
const { generateHash } = require('../helpers/bcrypt')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

let userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: [{
      validator: function (email) {
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
        return emailRegex.test(email)
      },
      message: `Not a valid email address`
    }],
    unique: true
  },
  password: {
    type: String,
    required: true
  }/* ,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Posts'
  }] */
})

userSchema.plugin(uniqueValidator)
userSchema.pre('save', function (next) {
  this.password = generateHash(this.password)
  next()
})

let User = mongoose.model('Users', userSchema)

module.exports = User
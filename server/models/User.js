const mongoose = require('mongoose')

const { hashPassword, comparePassword } = require('../helpers/auth')

const userSchema = mongoose.Schema({
  email: String,
  password: String
})

userSchema.methods.comparePassword = function (str) {
  return comparePassword(str, this.password)
}

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = hashPassword(this.password)
  }

  next()
})

const User = mongoose.model('user', userSchema)

module.exports = User

const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, `first name required.`],
  },
  lastName: {
    type: String,
    required: [true, `last Name required.`],
  },
  email: String,
  password: {
    type: String,
    required: [true, 'Password is required.'],
  }
})

let User = mongoose.model('User', userSchema)

User.schema.path('email').validate(function (input) {
  return User.findOne({email: input})
    .then(found => {
      if(found) {
        return false
      } else {
        return true
      }
    })
    .catch(err => {console.log(err)})
}, 'Email has been used.')

module.exports = User
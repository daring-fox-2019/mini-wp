const mongoose = require('mongoose')
const { hash } = require('../helpers/bcryptjs')

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Name required.`],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [{
      validator: function (value) {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          return false
        }
      },
      message: props => `${props.value} is not a valid email.`
    },
    {
      validator: function (value) {
        return User.find({
          _id: { $ne: this._id },
          email: value
        })
          .then(data => {
            if (data.length !== 0) {
              return false
            }
          })
          .catch(err => {
            throw err;
          });
      },
      message: props => `${props.value} has been used.`
    }]
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [5, 'Minimal password length: 5']
  },
  articles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    default: []
  }]
})

userSchema.pre('save', function (next) {
  this.password = hash(this.password)
  next()
})

let User = mongoose.model('User', userSchema)

User.schema.path('email').validate(function (input) {
  User.findOne({ email: input })
    .then(found => {
      if (found) {
        return false
      } else {
        return true
      }
    })
    .catch(err => { console.log(err) })
}, 'Email has been used.')

module.exports = User


module.exports = User
const mongoose = require('mongoose')
const Schema = require('mongoose').Schema
const {getHash}  = require('../helpers/passwordHash')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [
            {
                validator: function(value) {
                    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
                    return emailRegex.test(value)
                },
                message: "Must be email format!"
            },
            {
                validator: function(value) {
                    return User.findOne({email: value, _id: {$ne: this._id}})
                        .then(user => {
                            if(user) {
                                return false
                            }
                        })
                        .catch(err => {
                            throw new Error(err)
                        })

                },
                message: "Email already in use!"
            }
        ]
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: ''
    },
    created_at: {
        type: Date,
        default: new Date
    },
    role: {
        type: String,
        default: 'user'
    }
})

userSchema.pre('save', function(next) {
    this.password  = getHash(this.password)
    next()
})

const User  = mongoose.model('User', userSchema)

module.exports = User
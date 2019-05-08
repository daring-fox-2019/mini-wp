const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate: {
                validator: function() {
                    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
                    return emailRegex.test(this.email)
                },
                message: "Must be email format!"
        }
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
    }
})

userSchema.pre('save', function(next) {
    User.findOne({username: this.username})
        .then(found => {
            if(found && found._id !== this._id) {
                next(`Username must be unique`)
            }
            next()
        })
})

const User  = mongoose.model('User', userSchema)

module.exports = User
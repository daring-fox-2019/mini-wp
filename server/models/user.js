const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be empty'],
        minlength: [4, 'Minimum username character for username is 4'],
        validate: [{
            validator: function (username) {
                return User.findOne({
                    _id: {
                        $ne: this._id
                    },
                    username: username
                })
                    .then(found => {
                        if (found) return false
                    })
            }, message: 'Username has been taken'
        }]
    },
    password: {
        type: String,
        required: [true, 'Password must be filled'],
        minlength: [6, 'Minimum password length is 6']
    },
    email: {
        type: String,
        required: [true, "Email must be filled"],
        unique: true,
        validate: [
            {
                validator:
                    function isEmail(email) {
                        return /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i.test(email)
                    }, message: 'Email not valid'
            },
            {
                validator:
                    function isUnique(email) {
                        return User.findOne({_id : {$ne : this.id}, email : this.email})
                        .then(found => {
                            if (found) return false
                        })
                    }, message : 'Email has been taken'
            }
        ]
    },
    image : {
        type : String
    }
}, {timestamps : true})

userSchema.pre('save', function(next) {
        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(this.password, salt)
        this.password = hash
    next()
})


const User = mongoose.model('User', userSchema)
module.exports = User
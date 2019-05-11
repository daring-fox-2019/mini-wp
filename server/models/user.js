const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {bcrypt} = require('../helpers/')

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'nama tidak boleh kosong']
    },
    email: {
        type: String,
        validate: [
            {
                validator: function (data) {
                    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data)
                },
                message: 'format email salah'
            },
            {
                validator: function (data) {
                    return mongoose.model('User', UserSchema).find({
                        _id: {
                            $ne: this._id
                        },
                        email: data
                    })
                        .then(found => {
                            if (found.length !== 0) {
                                return false
                            }
                        })
                        .catch(err => {
                            return err.message
                        })
                },
                message: 'Email sudah digunakan'
            }
        ]

    },
    password: {
        type: String,
        required: [true, 'pasword tidak boleh kosong'],
        minlength: [6, 'password harus lebih dari 6 char']
    }
})
UserSchema.pre('save', function (next) {
    this.email = this.email.toLowerCase()
    let temp = bcrypt.hash(this.password)
    this.password = temp
    console.log(this.password)
    next()
})

const User = mongoose.model('User', UserSchema)
module.exports = User
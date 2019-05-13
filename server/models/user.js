const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {hash} = require('../helpers/bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        validate: [{
            validator(email) {
                return User.findOne({email})
                .then(found => {
                    if(found) {
                        return false;
                    }
                })
            },
            message: 'Email is registered, please use another'
        }, {
            validator(email) {
                const regex = /\S+@\S+\.\S+/
                return regex.test(email)
            },
            message: 'Please enter valid email address'
        }]
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    totalFollower: {
        type: String,
    },
    image: {
        type: String,
    }
});

userSchema.pre('save', function(next) {
    console.log('yaya masuk hooks')
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
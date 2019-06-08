const mongoose = require('mongoose');
const {Schema } = mongoose;
const Helper = require('../helpers/helper')

const memberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator: function (email) {
                    return new Promise(function (resolve, reject) {
                        Member.findOne({
                                email
                            })
                            .then(data => {
                                if (data === null) {
                                    resolve(true)
                                } else {
                                    resolve(false)
                                }
                            })
                            .catch(err => {
                                reject(err)
                            })
                    });
                },
                message: props => `${props.value} sudah terdaftar`
            }
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'Password min length is 4'],
    }
});

memberSchema.pre('save', function(next, done) {
    this.password = Helper.hashPassword(this.password)
    next()
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const {Schema } = mongoose;

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
        minlength: [11, 'Phone length 11~13'],
    }
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member
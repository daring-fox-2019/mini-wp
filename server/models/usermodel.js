const mongoose = require('mongoose');
const hashPassword = require("../helpers/hashPassword.js")
const comparePassword = require("../helpers/comparePassword.js")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        dropDups: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next();
});

userSchema.methods.comparePassword = function(inputPassword) {
    if(comparePassword(inputPassword, this.password)) {
        return true
    }
    return false
};

module.exports = mongoose.model('User', userSchema); // the model
const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const tagSchema = new Schema({
    text: {
        type: String,
        required: [true, 'tag name is required'],
        validate: {
            validator: function(value) {
                if(value === '' || value === ' ') {
                    return false
                }
            },
            msg: 'Must not empty'
        }
    }
})

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag
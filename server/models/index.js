const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = require('mongoose').Schema

let articleSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    title:{type:String, required:true},
    content: {type:String, required:true},
    created_at:Date,    
    featured_image:String,
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
})

let tagSchema = new Schema({
    title: String
})

let userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String, match: [/\w+@\w+\.\w+/, 'please supply a valid email format'],
        required: true,
        validate: [{
            validator: async function (val) {
                let already = await User.findOne({ _id: { $ne: this._id }, email: val })
                return already == null
            }, msg: 'email already in use'
        }]
    },
    password: { type: String, select: false, required: true },
    image: String
})

//synchronous
userSchema.pre('save', function () {
    if (this.isModified('password')) { this.password = bcrypt.hashSync(this.password, 6) }
})

userSchema.methods.comparePassword = function (str) {
    return bcrypt.compareSync(str, this.password)
}

let User = mongoose.model('User', userSchema)
let Article = mongoose.model('Article', articleSchema)
let Tag = mongoose.model('Tag', tagSchema)

module.exports = { User, Article, Tag }


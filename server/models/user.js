const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost/mini-wp',{ useNewUrlParser: true } );

let userSchema = new Schema({
    firstName : {
        type : String,
        required: [true, `First Name Required`]
    },
    lastName: {
        type : String,
        required: [true, `Last Name Required`]
    },
    email : {
        type: String,
        required : [true, 'Email Required'],
        validate : [{
            validator : function(value) {
                if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
                    throw "Invalid email format"
                }
            },
        },
        {
            validator :function(value){
                return User.find({
                    _id : {$ne: this._id},
                    email : value
                })
                .then(data =>{
                    if(data.length !== 0){
                        throw 'Email has been taken'
                    }
                })
                .catch(err =>{
                    throw err
                })
            }
        }]
    },
    password: {
        type : String,
        required : [true , 'Password is Required.']
    },
    articleList : [{type: Schema.Types.ObjectId, ref : 'article'}]
})

userSchema.pre('save',function(next){
    let user = this
    let salt = bcrypt.genSaltSync(8)
    let hash = bcrypt.hashSync(user.password,salt)
    user.password = hash
    next()
})

let User = mongoose.model('user',userSchema)

module.exports = User

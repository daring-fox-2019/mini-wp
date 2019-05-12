const mongoose = require('mongoose')
mongoose.connect(process.env.DB_PATH, {
    useNewUrlParser: true
})
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: (v) => {
                async function checkEmail(v) {
                    let check = await Users.findOne({
                        email: v
                    })
                    if (check) return false
                    else return true
                }
                let isUsed = checkEmail(v)
                return isUsed
            },
            message: "email already taken"
        }
    },
    password: String,
    name: String
})

userSchema.pre('save', function (next) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(this.password, salt)
    this.password = hash
    next()
})
const Users = mongoose.model('Users', userSchema)

module.exports = Users
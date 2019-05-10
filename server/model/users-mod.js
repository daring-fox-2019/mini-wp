const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(val){
                return User.findOne({email: val})
                .then(data => {
                    if (data){
                        return false
                    }
                })
                .catch(err => {
                    console.log(err.message)
                })
            },
            message: props => `${props.value} has already registered`
        },
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    pp: String
})

const User = mongoose.model('User', userSchema)

module.exports = {
    findOne: function(id){
        return User.findOne({_id:id})
    },
    findOneByEmail: function(email){
        return User.findOne({email:email})
    },
    find: function(){
        return User.find()
    },
    register: function(email,password,pp){
        return User.create({email,password,pp})
    },
    update: function(id,email,password,pp){
        return User.updateOne({_id:id}, {email,password,pp})
    },
    delete: function(id){
        return User.deleteOne({_id:id})
    }
}
const User = require('../models/user')
const {compare} = require('../helpers/bcrypt')
const {sign} = require('../helpers/jwt')
class UserController {
    static login(req,res) {
        const {email, password} = req.body;

        User.findOne({email})
        .then(found => {
            if(found) {
                if (compare(password, found.password)) {
                    const {_id, email, name} = found
                    const token = sign({_id, email,name})
    
                    res.status(200).json({token, message:'login success', name, _id})
                } else {
                    res.status(400).json({message:'invalid email/password'})
                }
            } else {
                res.status(400).json({message: 'invalid email/password'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'login error'
            })
        })
    }

    static register(req,res) {
        const {email, password, name} = req.body
        const obj_register = {email,password,name}
        User.create(obj_register)
        .then(created => {
            res.status(201).json(created)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }

    static googleLogin(req,res) {
        const { email, name, picture, image } = req.payload
        const user_obj = {email, name, picture, image}

        User.findOne({email})
        .then(found => {
            if(found) {
                console.log('email found')
                const token = sign({
                    _id: found._id,
                    email: found.email,
                    image: found.image,
                    name: found.name
                })
                res.status(200).json({
                    message: 'successfully logged in',
                    token: token,
                    email: found.email,
                    name: found.name,
                    image: found.image,
                })
            } else {
                user_obj.password = 'yayayayarandom'
                return User.create(user_obj)
                .then(created => {
                    const to_be_decoded = {
                        email: created.email,
                        picture: created.picture,
                        name: created.name
                    }

                    const token = sign(to_be_decoded)
                    res.status(200).json({
                        message: 'successfully logged in',
                        token: token,
                        email: created.email,
                        name: created.name,
                        image: created.image,
                    })
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'error when google login',
                error: err,
            })
        })
    }   
}
module.exports = UserController
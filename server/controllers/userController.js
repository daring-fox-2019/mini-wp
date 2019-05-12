const User = require('../models/user')
const {sign} = require('../helpers/jwt')
const {decrypt} = require('../helpers/bcrypt')

class ConttrollerUser{
    static Register(req, res){
        User
        .create({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        })
        .then(response => {
            res.status(201).json({
                response,
                msg: "Success Register"
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: "Internal Server Error"
            })
        })
    }
    static Login(req, res){
        User
        .findOne({
            email: req.body.email
        })
        .then(response => {
            if(response){
                if (decrypt(req.body.password, response.password)){
                    let payload = {
                        id : response._id,
                        userName : response.userName,
                        email : response.email
                    }
                    let token = sign(payload)
                    res.status(200).json({
                        access_token : token
                    })
                }else{
                    res.status(401).json({
                        msg: "Email/Password Wrong, Try Again"
                    })
                }
            }else{
                res.status(404).json({
                    msg: "User Not Found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: "Internal Server Error"
            })
        })
    }
}

module.exports = ConttrollerUser
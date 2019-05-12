const User = require('../models/user')

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
                res.status(200).json(response)
            }else{
                res.status(404).json({
                    msg: "Not Found"
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
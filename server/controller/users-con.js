const bcrypt = require('../helper/bcrypt')
const User = require('../model/users-mod')
const jwt = require('../helper/jwtoken')
const googleAuth = require('../helper/google-auth')

function showOneByEmail(email) {
    return User.findOne({
        email: email
    })
}

module.exports = {
    showOne: function (req, res) {
        let id = req.params.id
        User.findOne({
                _id: id
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    showAllUser: function (req, res) {
        User.find({})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    register: function (req, res) {
        let email = req.body.email
        let password = bcrypt.generateHash(req.body.password)
        let pp = req.body.pp
        let name = req.body.name
        User.create({
                email,
                password,
                pp,
                name
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    login: function (req, res) {
        if (req.body.user_google_email) {
            googleAuth(req, res)
        } else {
            let email = req.body.email
            let password = req.body.password
            showOneByEmail(email)
                .then(data => {
                    if (!data) {
                        throw new Error('your email is wrong')
                    } else {
                        if (bcrypt.checkPass(password, data.password)) {
                            let jwtoken = jwt.generateToken({
                                email: data.email,
                                _id: data._id,
        
                            })
                            res.status(200).json({
                                jwtoken,
                                name: data.name,
                                pp: data.pp,
                                id: data._id
                            })
                        } else {
                            throw new Error('your password is wrong')
                        }
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        message: err
                    })
                })
        }
    },
    updateUser: function (req, res) {
        let id = req.body.id
        let email = req.body.email
        let password = req.body.password
        let pp = req.body.pp
        User.updateOne({_id:id},{
                email,
                password,
                pp
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    deleteUser: function (req, res) {
        let id = req.body.id
        User.deleteOne({
                _id: id
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
}
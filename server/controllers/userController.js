const Users = require("../models/Users.js")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class userController {

    static getAll(req, res) {
        Users.find(req.query)
            .then(result => {
                if (result) {
                    res.status(200).json(result)
                } else {
                    res.status(404).json({
                        msg: 'not found'
                    })
                }
            }).catch(err => {
                res.status(500).json({
                    error: "cannot reach server"
                })
            })
    }

    static findById(req, res) {
        Users.findById(req.params.id)
            .populate('owner')
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        error: "user not found"
                    })
                } else {
                    res.status(200).json(found)
                }
            }).catch(err => {
                res.status(500).json({
                    error: "cannot reach server",
                })
            })
    }

    static create(req, res) {
        let user = new Users({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        })
        user.save()
            .then(savedData => {
                res.status(200).json(savedData)
            }).catch(err => {
                let isEmailError = err.errors.email.message
                if (isEmailError) {
                    res.status(400).json({
                        error: isEmailError
                    })
                } else {
                    res.status(500).json({
                        error: "cannot reach server"
                    })
                }
            })
    }

    static put(req, res) {
        Users.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        }).then(updatedData => {
            if (!updatedData) {
                res.status(404).json({
                    error: "id not found"
                })
            } else {
                res.status(200).json(updatedData)
            }
        }).catch(err => {
            res.status(500).json({
                error: "cannot reach server"
            })
        })
    }

    static patch(req, res) {
        Users.findByIdAndUpdate(req.params.id, {
            $set: {
                [req.body.field]: req.body.value
            }
        }).then(updatedData => {
            res.status(200).json(updatedData)
        }).catch(err => {
            res.status(500).json({
                error: "cannot reach server"
            })
        })
    }

    static delete(req, res) {
        Users.findByIdAndDelete(req.params.id)
            .then(deletedData => {
                res.status(200).json(deletedData)
            }).catch(err => {
                res.status(500).json({
                    error: "cannot reach server"
                })
            })
    }

    static signIn(req, res) {
        Users.findOne({
            email: req.body.email
        }).then(found => {
            if (found) {
                let isPasswordValid = bcrypt.compareSync(req.body.password, found.password)
                if (isPasswordValid) {
                    let token = jwt.sign({
                        name: found.name,
                        id: found.id,
                        email: found.email
                    }, process.env.JWT_SECRET)
                    res.status(200).json({
                        msg: "logged in",
                        token,
                        name: found.name
                    })
                } else {
                    res.status(404).json({
                        msg: "wrong password/username"
                    })
                }
            } else {
                res.status(404).json({
                    msg: "wrong password/username"
                })
            }
        }).catch(err => {
            res.status(500).json({
                error: "cannot reach server"
            })
        })
    }

}

module.exports = userController
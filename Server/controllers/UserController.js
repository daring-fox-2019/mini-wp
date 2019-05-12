const User = require('../models/user')
const jwt = require('../helpers/jwt')
const bcryptjs = require('../helpers/bcryptjs')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
    static register(req, res) {
        const { name, email, password } = req.body
        User
            .create({ name, email, password })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                let error = err
                if(err.errors.email.message) error = err.errors.email.message
                res.status(500).json(error)
            })
    }

    static signIn(req, res) {
        const { email, password } = req.body
        User.findOne({ email })
            .then(user => {
                if (user) {
                    if (bcryptjs.compareSync(password, user.password)) {
                        const myToken = jwt.sign({
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                        })
                        res.status(200).json({
                            token: myToken,
                            _id: user._id,
                            name: user.name,
                            email: user.email
                        })
                    } else {
                        res.status(400).json('Wrong email / password')
                    }
                } else {
                    res.status(400).json('Wrong email / password')
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })

    }

    static googleSignIn(req, res) {
        client
            .verifyIdToken({
                idToken: req.headers.access_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(ticket => {
                let payload = ticket.payload
                let foundUser = User.findOne({ email: payload.email })
                return Promise.all([payload, foundUser])
            })
            .then(([payload, foundUser]) => {
                if (!foundUser) {
                    return User.create({
                        name: payload.name,
                        email: payload.email,
                        password: "123456"
                    })
                } else {
                    return foundUser
                }
            })
            .then(user => {
                const myToken = jwt.sign({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                })
                res.status(200).json({
                    token: myToken,
                    _id: user._id,
                    name: user.name,
                    email: user.email
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findOne(req, res) {
        User
            .findOne({ _id: req.params.id })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findAll(req, res) {
        User
            .find()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = UserController
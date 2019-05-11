const { User, Article } = require('../models')
const { bcrypt, jwt } = require('../helpers')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
class userController {
    static register(req, res) {
        console.log('masuk register')
        let { name, email, password } = req.body
        User.create({
            name, email, password
        })
            .then(success => {
                res.status(201).json(success)
            })
            .catch(err => {
                res.status(500).json({
                    err: err.message
                })
            })
    }

    static login(req, res) {
        console.log('masuk login')
        User.findOne({
            email: req.body.email
        })
            .then(found => {
                // console.log(req.body.password)
                // console.log(found)
                if (found && bcrypt.compare(req.body.password, found.password)) {
                    let access_token = jwt.sign({
                        email: found.email,
                        id: found._id
                    })
                    res.status(200).json({
                        access_token, name: found.name
                    })
                } else {
                    res.status(400).json({
                        message: 'password yang anda masukan salah'
                    })
                }
            })
            .catch(err => {
                res.status(500).json('password yang anda masukan salah')
            })
    }

    static googleLogin(req, res) {
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                const { email, name } = ticket.getPayload()
                return User.findOneAndUpdate({
                    email
                }, {
                        name,
                        email,
                        password: name.slice(0, 3) + email.slice(0, 3)
                    }, {
                        new: true,
                        upsert: true
                    })
            })
            .then(result => {
                const payload = {
                    id: result._id
                }
                const access_token = jwt.sign(payload)
                res.status(200).json({ access_token, name: result.name })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = userController
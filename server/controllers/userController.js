const User = require('../models/user')
const { sign, verify } = require('../helpers/jwt')
const { hash, compare } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID);

class userController {
    static signUp(req, res) {
        const { first_name, last_name, email, password } = req.body
        User
            .create({ first_name, last_name, email, password })
            .then((createdUser) => { res.status(201).json({ message: 'Thank you for registering!', createdUser }) })
            .catch((err) => { res.status(500).json(err) })
    }

    static signIn(req, res) {
        const { email, password } = req.body
        User
            .findOne({ email })
            .then((findOneUser) => {
                if (!findOneUser) res.status(401).json({ message: 'Email/Password is incorrect!' })
                else {
                    if (!compare(password, findOneUser.password)) res.status(401).json({ message: 'Email/Password is incorrect!' })
                    else {
                        const { id, email } = findOneUser
                        const payload = { id, email }
                        const token = sign(payload)
                        req.headers.token = token
                        res.status(200).json({ message: 'You have successfully logged in!', token, details: payload })
                    }
                }
            })
            .catch((err) => { res.status(500).json(err) })
    }

    static googleSignIn(req, res) {
        const { token } = req.body
        let payload;
        let userToken;
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
            .then((ticket) => {
                payload = ticket.getPayload()
                const userid = payload['sub']
                return User
                    .findOne({ email: payload.email })
            })
            .then((findOneUser) => {
                const { email } = payload
                if (!findOneUser) {
                    return User
                        .create({ email, password: process.env.GOOGLE_DEFAULT_PASSWORD })
                } else return findOneUser
            })
            .then((user) => {
                const { id, email } = user
                const userPayload = { id, email }
                userToken = sign(userPayload)
                req.headers.token = userToken
                res.status(200).json({ message: 'You are now logged in via Google Sign In!', userToken, details: userPayload })
            })
            .catch((err) => { res.status(500).json(err) })
    }
}
module.exports = userController
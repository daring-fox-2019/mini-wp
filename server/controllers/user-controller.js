const User = require('../models/user-model')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')

class userController {
    static register(req, res) {
        const { username, email, password, image } = req.body
        let gcsUrl = ''
        if (!req.file) {
            gcsUrl = 'https://upload.wikimedia.org/wikipedia/en/d/d1/Image_not_available.png'
        } else {
            gcsUrl = req.file.gcsUrl
        }
        User
            .create({
                username,
                profilePicture : gcsUrl,
                email,
                password
            })
            .then((createdUser) => {
                res.status(200).json({ message: 'Successfully created a user!', createdUser })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static login(req, res) {

        const { email, password } = req.body
        User
            .findOne({
                email
            })
            .then((findOneUser) => {
                if (!findOneUser) res.status(401).json({ message: 'Email/Password is incorrect!' })
                else if (!compare(password, findOneUser.password)) res.status(401).json({ message: 'Email/Password is incorrect!' })
                else {
                    const { id, email, username, profilePicture } = findOneUser
                    const payload = { id, email, username, profilePicture }
                    const token = sign(payload)
                    req.headers.token = token
                    res.status(200).json({
                        message: 'You have successfully logged in!',
                        token,
                        details: payload
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}

module.exports = userController

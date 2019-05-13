const { OAuth2Client } = require('google-auth-library')

const UserModel = require('../models/User')

const { createToken } = require('../helpers/auth')

class Auth {
  static register (req, res) {
    UserModel
      .create({
        email: req.body.email,
        password: req.body.password
      })
      .then(user => res.status(201).json({ user }))
      .catch(() => res.satus(500).json({ message: 'Internal Server Error' }))
  }

  static login (req, res) {
    UserModel
      .findOne({ email: req.body.email })
      .then(user => {
        if (user && user.comparePassword(req.body.password)) {
          let jwtToken = createToken(user)
          res.status(201).json({ user, jwtToken })
        } else {
          res.status(400).json({ message: 'Bad Credentials' })
        }
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static googleSignin (req, res) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket => {
        let payload = ticket.getPayload()

        UserModel
          .findOne({ email: payload.email })
          .then(user => {
            if (user) {
              return user
            } else {
              return UserModel
                .create({
                  email: payload.email,
                  password: Array.from(
                    Array(5),
                    el => Math.floor(Math.random() * 10)
                  ).join('')
                })
            }
          })
          .then(user => {
            let jwtToken = createToken(user)
            res.status(201).json({ user, jwtToken })
          })
          .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }
}

module.exports = Auth

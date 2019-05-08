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
}

module.exports = Auth

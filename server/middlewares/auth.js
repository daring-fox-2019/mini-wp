const UserModel = require('../models/User')
const { verifyToken } = require('../helpers/auth')

const loggedIn = (req, res, next) => {
  let jwtToken = req.headers.authorization
  if (jwtToken) {
    try {
      let payload = verifyToken(jwtToken)
      UserModel
        .findById(payload._id)
        .then(user => {
          if (user) {
            req.user = user
            next()
          } else {
            res.status(400).json({ message: 'Invalid Token' })
          }
        })
        .catch(() => res.status(500).json({ mesage: 'Internal Server Error' }))
    } catch (e) {
      res.status(400).json({ message: 'Invalid Token' })
    }
  } else {
    res.status(400).json({ message: 'Missing Token' })
  }
}

module.exports = { loggedIn }

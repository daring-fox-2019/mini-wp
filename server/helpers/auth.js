const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const hashPassword = (str) => bcrypt.hashSync(str)

const comparePassword = (str, hash) => bcrypt.compareSync(str, hash)

const createToken = (user) => {
  return jwt.sign({
    _id: user._id,
    email: user.email
  }, process.env.JWT_SECRET_KEY)
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY)
}

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  verifyToken
}

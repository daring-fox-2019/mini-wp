const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { comparePass } = require('../helpers/bcrypt')
const randomPass = require('../helpers/randomPass')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
  static GoogleSignIn(req, res) {
    let payload = null;
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then((ticket) => {
        payload = ticket.getPayload();
        const userid = payload['sub']
        console.log('verifyIdToken')
        return User.findOne({ email: payload.email })
      })
      .then((user) => {
        console.log('findOne User')
        if (user) {
        console.log('if')
          let { name } = user
          let payload = {
            _id: user._id,
            name: user.name,
            email: user.email
          }
          let token = jwt.sign(payload, process.env.KUNCI, { expiresIn: "7d" })
          console.log('token --->', token, '<---token')
          res.status(200).json({ token, name })
        } else {
        console.log('else')
          let passRandom = randomPass()
          User.create({
            name: payload.name,
            email: payload.email,
            password: passRandom
          })
            .then((user) => {
              console.log('create User')
              let { name } = user
              let payload = {
                _id: user._id,
                name: user.name,
                email: user.email
              }
              let token = jwt.sign(payload, process.env.KUNCI)
              console.log('token --->', token, '<---token')
              res.status(201).json({ token, name, passRandom })
            })
            .catch((err) => {
              res.status(500).json(err)
            })
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  }

  static register(req, res) {
    User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      .then(user => {
        res.status(201).json({
          message: "register success"
        })
      })
      .catch(err => {
        if (err.message) {
          res.status(406).json({
            message: `Register failed : ${err.message}`
          })
        }
        else res.status(500).json({
          message: "Register failed"
        })
      })
  }

  static login(req, res) {
    User
      .findOne({
        email: req.body.email
      })
      .then(user => {
        if (user) {
          const isSame = comparePass(req.body.password, user.password)
          if (isSame) {
            let { name } = user
            let payload = {
              _id: user._id,
              name: user.name,
              email: user.email
            }
            let token = jwt.sign(payload, process.env.KUNCI, { expiresIn: "7d" })
            console.log('token login -->', token)
            res.status(200).json({
              token, name
            })
          }
          else {
            res.status(403).json({
              message: 'Email atau password salah'
            })
          }
        }
        else {
          res.status(404).json({
            message: "Email not found, please register first"
          })
        }
      })
      .catch(err => {
        if (err.message) {
          res.status(406).json({
            message: `Login failed : ${err.message}`
          })
        }
        else res.status(500).json({
          message: "Internal Server Error Login"
        })
      })
  }
}

module.exports = UserController
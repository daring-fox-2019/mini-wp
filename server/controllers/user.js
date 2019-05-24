const modelUser = require('../models/user')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')
const { mailOptions, transporter } = require('../helpers/nodemailer')
const kue = require('kue')
const queue = kue.createQueue()

class userController {
  static create(req, res) {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    modelUser.create(newUser)
      .then(data => {
        mailOptions.to = req.body.email
        queue.create('email').save()

        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json({ err })
      })
  }

  static signin(req, res) {
    modelUser.findOne({ email: req.body.email })
      .then(userFound => {
        if (userFound) {
          if (compare(req.body.password, userFound.password)) {
            let token = sign({ _id: userFound._id, name: userFound.name, email: userFound.email })
            res.status(200).json({ token, userId: userFound._id, userName: userFound.name })
          } else {
            res.status(400).json({ msg: "Bad request" })
          }
        } else {
          res.status(400).json({ msg: "Bad request" })
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static googleLogin(req, res) {
    let payload;
    client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        payload = ticket.getPayload() // dari sana

        return modelUser.findOne({
          email: payload.email
        })
      })
      .then((foundUser) => {
        if (foundUser) {
          const token = sign({ _id: foundUser._id, name: foundUser.name, email: foundUser.email })
          res.status(200).json({ token, userId: foundUser._id, userName: foundUser.name })
        } else {
          let newUser = new modelUser({
            name: payload.name,
            email: payload.email,
            password: payload.email
          })
          modelUser.create(newUser)
            .then(data => {
              mailOptions.to = req.body.email
              queue.create('email').save()

              const token = sign({ _id: data._id, name: data.name, email: data.email })
              res.status(200).json({ token, userId: data._id, userName: data.name })
            })
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err.message)
      })
  }
}


queue.process('email', function (job, done) {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    } else {
      done()
    }
  })
})

module.exports = userController

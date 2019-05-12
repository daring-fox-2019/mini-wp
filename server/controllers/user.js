const { OAuth2Client } = require('google-auth-library');
const { hash } = require('../helpers/bcryptjs')
const { compare } = require('../helpers/bcryptjs')
const { sign } = require('../helpers/jwt')
const { User } = require('../models')
class ControllerUser {

  static loginGoogle(req, res) {
    const client = new OAuth2Client(process.env.GCLIENT_ID);
      client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.GCLIENT_ID
      })
      .then(ticket=>{
        const payload = ticket.getPayload({});
        
        return User.findOne({email : payload.email})
        .then(found =>{
          if(found) {
            let obj = {email : payload.email}
            let access_token = sign(obj)
            res.status(201).json({access_token})
          }else{
            let firstName = payload.name.split(' ')[0]
            let lastName = payload.name.split(' ').slice(1).join(' ')
            return User.create({
              email: payload.email,
              firstName: firstName,
              lastName: lastName,
              password : ' '  
            })
            .then(user =>{
              let obj = {email: user.email}
              let access_token = sign(obj)
              res.status(200).json({access_token})
            })
          }
        })
        
      })
      .catch(err=>{
        res.status(500).json({
          message : 'internal server error'
        })
      })
    }
   
  static create(req, res) {
    let hashed = hash(req.body.password)
    let input = req.body
    User.findOne({ email: input.email })
      .then(found => {
        if (found) {
          res.status(401).status({ message: 'Email already used' })
        } else {
          return User.create({
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            password: hashed
          })
        }
      })
      .then(user => {
        let obj = { email: user.email }
        let access_token = sign(obj)
        res.status(201).json({
          access_token: access_token,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`
        })
      })
      .catch(err => {
        res.status(500).json({ err: err.message })
      })
  }
  static login(req, res) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          res.status(400).json({ message: 'username / password innvalid' })
        } else {
          if (!compare(req.body.password, user.password)) {
            res.status(400).json({ message: 'username / password innvalid' })
          } else {
            let obj = {
              email: user.email
            }
            let access_token = sign(obj)
            res.status(200).json({
              access_token: access_token,
              email: user.email,
              name: `${user.firstName} ${user.lastName}`
            })
          }
        }
      })
      .catch(err => {
        res.status(500).json({ err: err.message })
      })
  }
}
module.exports = ControllerUser
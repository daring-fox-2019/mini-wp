const {generateHash, compareHash} = require('../helper/index')
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);


class UserController {

  static signUp (req,res){
    console.log(req.body);
    let {username,email,password} = req.body
    let newPas = generateHash(password)
    User.create({
      username : username,
      email : email,
      password : newPas
    })
    .then(user=>{
      res.status(201).json(user)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }

  static signIn (req,res){
    let {email, password} = req.body
    User.findOne({email})
    .then(user=>{
      let checkPassword = compareHash(password, user.password)
      if(checkPassword){
        let dataUser = {id : user._id, email : user.email}
        let token = jwt.sign({ id: user._id, email : user.email },process.env.SECRET);
        res.status(200).json({token, dataUser})
      } else {
        res.status(400).json({ message: 'invalid username or password' })
      }
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }

  static signInGoogle(req, res) { // populate
    var newEmail = ''
    client.verifyIdToken({
      idToken: req.headers.token,
      audience: process.env.CLIENT_ID
    })
      .then(function (ticket) {
        newEmail = ticket.getPayload().email
        return User.findOne({
          email: newEmail
        })
      })
      .then(function (userLogin) {
        console.log('masuk ke then 2')
        if (!userLogin) {
          return User.create({
            email: newEmail,
            password: 'password',
          })
        } else {
          return userLogin
        }
      })
      .then(function (newUser) {
        console.log('masuk ke then 3')
        let token = jwt.sign({ email: newUser.email, _id: newUser._id, projects: newUser.projects }, process.env.SECRET);
        res.status(200).json({ token })
      })
      .catch(function (err) {
        console.log(err)
        res.status(500).json(err)
      })
  }

}

module.exports = UserController
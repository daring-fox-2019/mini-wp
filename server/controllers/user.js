const User = require('../models/user')
const { encrypt } = require('../helpers/password')
const { decrypt } = require('../helpers/password')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID);


class ControllerUser{
  static createNewUser(req,res){
    let newUser = {
      name : req.body.name,
      email : req.body.email,
      password : req.body.password
    }
    console.log(newUser)
    User.create(newUser)
    .then(result=>{
      res.json(result)
    })
    .catch(err=>{
      console.log(err)
      res.json(err.errors)
    })
  }

  static signInUser(req,res){
    console.log(req.body)
    let condition = {
      email : req.body.email
    }

    User.findOne(condition)
    .then(result=>{
      console.log(result)
      if(result){
        if (decrypt(req.body.password, result.password) == true){ 
         let token = jwt.sign({email : result.email, id : result._id}, process.env.SECRET_JWT)
         let obj = {
           id : result._id,
           name : result.name,
           email : result.email,
           token
         }
         res.status(200).json(obj)
        } else {
          console.log("password ga cocok")
          throw { message : "password / email wrong" }
        }
      } else {
        throw { message : "password / email wrong" }
      }
    })
    .catch(error=>{
      console.log(error)
      res.json(error)
    })
  }

  static signInGoogle(req, res) {
    var newEmail = ''
    client.verifyIdToken({
            idToken: req.headers.token,
            audience: process.env.CLIENT_ID
        })
        .then(function(ticket) {
            theUser = ticket.getPayload()
            console.log(newEmail, "11111111")
            User.findOne({
                email: theUser.email
            })
            .then(userfound=>{
              let thepassword = encrypt(process.env.PASSWORD)
              
              if(userfound){
                return User.create({
                  name : theUser.name,
                  email: theUser.email,
                  password: thepassword
                })
              } else {
                console.log(userfound, "==============")
                return userofound
              }
            })
        })
        .then(function(newUser) {
          console.log(newUser, "<<<<<=")
            let token = jwt.sign({
                email: newUser.email,
                id: newUser._id
              }, process.env.SECRET_JWT)
            
              let obj = {
                token,
                name : newUser.name,
                id: newUser._id,
                email: newUser.email
            }
            res.status(200).json(obj)
        })
        .catch(function(err) {
            console.log(err)
            res.status(500).json(err)
        })
  }

}

module.exports = ControllerUser
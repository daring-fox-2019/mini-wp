const User = require("../models/user");
const {
  hashPass,
  generateJWT,
  compareHash,
  decodeJWT
} = require("../helpers/helper");
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
  static create(req, res) {
    let newUser = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    });
    newUser
      .save()
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        });
      });
  }
  static findAll(req, res) {
    User.find()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        });
      });
  }
  
  static login(req, res) {
    if(req.body.googleToken){
      client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      .then(ticket=>{
        let payload = ticket.getPayload()
        User.findOne({email: payload.email})
        .then(user=>{
          if (user){
            let newToken = generateJWT({
              id: user._id,
              email: user.email,
              name: user.name
            })
            res.status(200).json({
              token: newToken
            })
          }else{
            let newUser = new User({
              name : payload.name,
              email: payload.email,
              password: 123456
            })
            newUser.save()
            .then(created=>{
              let newToken = generateJWT({
                id: created._id,
                email: created.email,
                name: created.name
              })
              res.status(200).json({
                token : newToken
              })
            })
          }
        })
      })
      .catch(err=>{
        console.log(err.message)
        res.status(500).json({
          msg: err.message
        })
      })
    }else{
      User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          let check = compareHash(req.body.password, user.password);
          if (check) {
            let token = generateJWT({
              id: user._id,
              email: user.email,
              username: user.username,
              name: user.name
            });
            res.status(200).json(token);
          } else {
            console.log(req.body)
            res.status(400).json({
              msg: "invalid email/password"
            })
          }
        } else {
          res.status(400).json({
            msg: "invalid email/password"
          })
        }
      })
      .catch(err=>{
        res.status(500).json({
          msg: err.message
        })
      })
    }
  }
}

module.exports = UserController;

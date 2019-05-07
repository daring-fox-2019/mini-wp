const User = require("../models/user");
const {
  hashPass,
  generateJWT,
  compareHash,
  decodeJWT
} = require("../helpers/helper");

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
    User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        let check = compareHash(req.body.password, user.password);
        if (check) {
          let token = generateJWT({
            email: user.email,
            username: user.username,
            name: user.name
          });
          res.status(200).json(token);
        } else {
          res.status(400).json({
            msg: "Password Wrong"
          });
        }
      } else {
        res.status(400).json({
          msg: "Email not found"
        });
      }
    })
    .catch(err=>{
      res.status(500).json({
        msg: err.message
      })
    })
  }
}

module.exports = UserController;

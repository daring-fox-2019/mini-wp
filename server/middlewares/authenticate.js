const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if(req.headers.hasOwnProperty('token')){
    req.decoded = jwt.verify(req.headers.token, process.env.KUNCI)
    // cek user ada di database atau tidak
    // console.log("Authenticate",req.decoded._id)
    User.findOne({_id:req.decoded._id})
    .then(user =>{
      // console.log(user)
      if(user) 
        next()
      else 
        res.status(403).json({
          message: 'User not found'
        })
    })
    .catch(err =>{
      res.status(403).json({
        message: 'Authenticate catch'
      })
    })
  }
  else {
    res.status(401).json({
      message: 'login dulu, baru masuk mas'
    })
  }
}
const jwt = require('jsonwebtoken')
const Article = require('../models/article')
const { ObjectID } = require('mongodb')

function authentication(req,res,next){
  try {
    let decoded = jwt.verify(req.headers.token, process.env.SECRET_JWT);
    if(decoded.id == req.headers.id){
      console.log("berhasil lewatin authentication")
      next();
    } else {
      console.log("gagal authentication di try, id decodedyang diverivy ga sama dengan yg di headers")
      res.status(403).json({message : "you have invalid token"})
    }
  } catch(err) {
    console.log("gagal authentication di catch")
    res.status(403).json({message : "you have invalid token"})
  }
}

function authorization(req,res,next){
  let condition = {
    _id : new ObjectID(req.params.id),
    userId : new ObjectID(req.headers.id),
    }
    console.log("mencari data ini di authorization =>",condition)
    Article.findOne(condition)
    .then(result=>{
      console.log("dapat data ini =>", result)
      if(result){
        console.log("berhasil lewatin authorization, file dengan kondisi diatas ketemu")
        next();
      } else {
        console.log("gagal lewatin authorization, file dgn kondisi diatas ga ketemu")
        res.status(403).json({message : "authorization failed, you have no rights to access this"})
      }
    })
    .catch(err=>{
      console.log("error di authorization")
      res.status(403).json({message : "authorization failed, you have no rights to access this"})
    })
  }

module.exports = { authentication, authorization }
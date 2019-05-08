const { Article } = require("../models");
const {
  hashPass,
  generateJWT,
  compareHash,
  decodeJWT
} = require("../helpers/helper");
const moment = require('moment')

class ArticleController {
  static create(req, res) {
    let decode = decodeJWT(req.headers.token)
    let newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      published: 0,
      author: decode.id
    });
    newArticle.save().then(article => {
      res.status(201).json(article);
    });
  }
  static findAll(req,res){
    let decode = decodeJWT(req.headers.token)
    let obj = {author: decode.id}

    for(let key in req.query){
      obj[key] = req.query[key]
    }
    Article.find(obj)
    .populate("author")
    .then(articles=>{
      // console.log(articles)
      res.status(200).json(articles)
    })
    .catch(err=>{
      res.status(500).json({
        msg: err.message
      })
    })
  }
  static update(req,res){
    let obj ={}
    for(let key in req.body){
      if (key !== "id"){
        obj[key] = req.body[key]
      }
      if (key == "published"){
        obj["published_at"] = moment()
      }
    }
    console.log(obj)
    Article.findOneAndUpdate({
      _id: req.body.id
    }, obj,{new: true})
    .then(updated =>{
      res.status(200).json(updated)
    })
    .catch(err=>{
      res.status(500).json({
        msg: err.message
      })
    })
  }
  static delete(req,res){
    Article.findByIdAndDelete(req.body.id)
    .then(deleted=>{
      console.log(deleted)
      res.status(200).json(deleted)
    })
    .catch(err=>{
      res.status(500).json({
        msg : err.message
      })
    })
  }
}

module.exports = ArticleController

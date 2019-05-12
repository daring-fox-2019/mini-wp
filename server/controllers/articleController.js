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
    console.log("CREATING ARTICLE")
    console.log(req.body)
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
    .sort("-updatedAt")
    .populate("author")
    .then(articles=>{
      res.status(200).json(articles)
    })
    .catch(err=>{
      res.status(500).json({
        msg: err.message
      })
    })
  }
  static update(req,res){
    console.log(req.body)
    let obj ={}
    for(let key in req.body){
      if (req.body[key] == null){
        continue
      }
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
      console.log(updated)
      res.status(200).json(updated)
    })
    .catch(err=>{
      console.log(err.message)
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
  static findAllPublished(req,res){
    Article.find({ published: 1})
    .sort("-createdAt")
    .populate('author')
    .then(articles=>{
      res.status(200).json(articles)
    })
    .catch(err=>{
      res.status(500).json({
        msg: err.message
      })
    })
  }
  static upload(req,res){
    console.log('UPLOADING')
    const image_data = {imageUrl: req.file.url}
    console.log("ini image data")
    console.log(image_data)
    console.log("ini req file")
    console.log(req.file)
    res.status(200).json(image_data)
  }
  static search(req,res){
    let { title, author } = req.query
        let obj = {}
        if( title || author ){ 
            author = new RegExp(`.*${author}.*`, "i") 
            title = new RegExp(`.*${title}.*`, "i")
            obj = { $or: [{"author.name" :author} ,{ "title" :title}] }
        }

        Article.find(obj)
        .populate("author")
        .then(data => {
            res.status(200).json(data)
        })
        .catch( err =>{
            res.status(500).json({
              msg: err.message
            })
        })
  }
}

module.exports = ArticleController

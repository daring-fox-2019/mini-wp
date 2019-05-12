const Article = require('../models/article')
const {ObjectID} = require('mongodb')

class ControllerArticle {
  // data : userId, title, snippet, content, createdAt, updatedAt, postedAt, status, image
  static newArticle(req, res){
    let newArticle = {
      userId : new ObjectID(req.headers.id),
      title : req.body.title,
      snippet : req.body.snippet,
      content : req.body.content,
      createdAt : req.body.createdAt,
      updatedAt : req.body.updatedAt,
      postedAt : req.body.postedAt,
      status : req.body.status,
      image : req.body.image
    }
    Article.create(newArticle)
    .then(result=>{
      res.json(result)
    })
    .catch(error=>{
      res.json({message : error.message})
      console.log("error create new article server", error)
    })
  }

  // static seeArticles(req,res){
  //   let condition = {
  //     userId : new ObjectID(req.headers.id)
  //   }

  //   Article.find(condition)
  //   .then(articles=>{
  //     res.status(201).json(articles)
  //   })
  //   .catch(error=>{
  //     res.status(500).json({message : error.message})
  //     console.log("error filter article server", error)
  //   })
  // }

  static seeArticles(req,res){
    let condition = {
      userId : new ObjectID(req.headers.id)
    }
    Article.find(condition)
    .then(articles=>{
      if(articles.length > 0){
        if(req.query.filter){
          let keyword = req.query.filter
          let result = []
          articles.forEach((article, i)=>{
            if((article.title.indexOf(keyword)) == -1){
              articles.splice(i, 1)
            }  
          })
          res.status(201).json(result)
        } else {
          console.log("gapake filter query")
          res.status(201).json(articles)
        }
      } else {
        res.status(201).json(articles)
      }
    })
    .catch(error=>{
      res.json({message : error.message})
      console.log("error filter article server", error)
    })
  }

  static deleteArticle(req,res){
    let condition = {
      _id : new ObjectID (req.params.id)
    }
    Article.findByIdAndDelete(condition)
    .then(del=>{
      res.json(condition)
    })
    .catch(error=>{
      res.json({message : error.message})
      console.log("error delete article server", error)
    })
  }

  static updateArticle(req,res){

  }
}

module.exports = ControllerArticle
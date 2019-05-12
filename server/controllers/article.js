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

  static seeArticles(req,res){
    let condition = {
      userId : new ObjectID(req.headers.id)
    }
    Article.find(condition)
    .then(articles=>{
      if(articles.length > 0){
        if(req.query.filter){
          let keyword = req.query.filter
          for(let i = 0; i < articles.length; i++){
            if((articles[i].title.indexOf(keyword)) == -1){
              console.log(articles[i].title, keyword)
              articles.splice(i, 1)
              i--
            }
          }
          res.status(201).json(articles)
        } else {
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
      res.status(500).json({message : error.message})
      console.log("error delete article server", error)
    })
  }

  static updateArticle(req,res){
    let condition = new ObjectID (req.params.id)
    let updateValue = {
      updatedAt : new Date
    }
    if(req.body.title && req.body.title != ""){
     updateValue.title = req.body.title
    }
    if(req.body.snippet && req.body.snippet != ""){
     updateValue.snippet = req.body.snippet
    }
    if(req.body.content && req.body.content != ""){
     updateValue.content = req.body.content
    }
    if(req.body.content && req.body.content != ""){
     updateValue.postedAt = req.body.postedAt
    }
    if(req.body.status && req.body.status != ""){
     updateValue.status = req.body.status
    }
    if(req.body.content && req.body.content != ""){
     updateValue.image = req.body.image
    }
    console.log("data yang di update =>", updateValue)
    
    Article.findByIdAndUpdate(condition, updateValue)
    .then(result=>{
      console.log("hasil update akan ada data yang sebelumnya =>",result)
      res.status(201).json(result)
    })
    .catch(error=>{
      res.status(500).json({message : error.message})
      console.log("error update article server", error)
    })
  }
}

module.exports = ControllerArticle
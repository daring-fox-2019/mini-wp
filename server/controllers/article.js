const { Article } = require('../models')

class ControllerArticle {
  
  static create(req, res) {
    let input = req.body
    let newArticle = {                                                                                                                                                                         
      title : input.title,
      description : input.description,
      image : req.file.cloudStoragePublicUrl,
      author : req.user._id
    }

    Article.create(newArticle)
      .then(data => {
        res.status(201).json( data )
      })
      .catch(err => res.status(500).json({ message: err.message }))
  }
  static findAll(req, res) {
    Article.find({author:req.user._id})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => res.status(500).json({message: err.message}))
  }
  static findOne(req, res) {
    Article.findOne({_id: req.params.id})
      .then(article => {
        res.status(200).json(article)
      })
      .catch(err => {res.status(500).json({message: err.message})})
  }
  static update(req, res) {
    let input = req.body
    let newArticle
    if(req.file){
       newArticle = {
        title: input.title,
        description: input.description,
        image: req.file.cloudStoragePublicUrl
      }
    }else {
       newArticle = {
        title: input.title,
        description: input.description,
      }
    }
    Article.findOneAndUpdate({_id: req.params.id}, newArticle, { new: true })
    .then(article => {
      res.status(200).json({
        message : 'updated succesfully'
      })
    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
  }
  static delete(req, res) {
    Article.findOneAndDelete({_id: req.params.id})
      .then(article => {
        let response = {
          message: 'Successfully deleted article.',
          id: req.params.id
        }
        res.status(200).json(response)
      })
      .catch(err => {res.status(500).json({message: err.message})})
  }
}

module.exports = ControllerArticle
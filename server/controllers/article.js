const modelArticle = require('../models/article')

class Article {
  static create(req, res) {
    let tags = req.body.tags.split(",")
    let newArticle

    if(req.file){
      newArticle = {
        title: req.body.title,
        content: req.body.content,
        created_at: new Date,
        status: req.body.status,
        author: req.userId,
        featured_image: req.file.cloudStoragePublicUrl,
        tags: tags
      }
    }else{
      newArticle = {
        title: req.body.title,
        content: req.body.content,
        created_at: new Date,
        status: req.body.status,
        author: req.userId,
        tags: tags
      }
    }
    modelArticle.create(newArticle)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json({ err })
      })
  }

  static findAll(req, res) {
    modelArticle.find({ author: req.userId })
      .populate("author")
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json({ err })
      })
  }

  static findOne(req, res) {
    modelArticle.findById(req.params.id)
      .populate("author")
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json({ err })
      })
  }

  static delete(req, res) {
    modelArticle.findByIdAndDelete(req.params.id)
      .populate("author")
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json({ err })
      })
  }

  static update(req, res) {
    let newArticle
    if (req.body.image == '') {
      newArticle = {
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,
        featured_image: req.body.image,
        tags: req.body.tags
      }
    } else {
      newArticle = {
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,
        tags: req.body.tags
      }
    }

    modelArticle.findByIdAndUpdate(req.params.id, newArticle, { new: true })
    .then(data=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      res.status(500).json({ err })
    })

  }
}

module.exports = Article
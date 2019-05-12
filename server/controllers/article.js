const { Article } = require('../models')

class ControllerArticle {
  static create(req, res, next) {
    let { title, content, tags } = req.body
    if (typeof tags == 'string') {
      tags = (tags.length > 0) ? tags.split(',') : []
    }
    let featuredImg = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
    if (req.file) {
      featuredImg = (req.file.cloudStoragePublicUrl) ? req.file.cloudStoragePublicUrl : ''
    }
    let newArticle = {
      title, content,
      author: req.user._id,
      featuredImg,
      tags,
      created: new Date(),
      modified: new Date()
    }
    Article.create(newArticle)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => next(err))
  }
  static findAll(req, res, next) {
    Article.find()
      .sort({ created: 'desc' })
      .populate('author', 'name')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => next(err))
  }
  static findOne(req, res, next) {
    Article.findOne({ _id: req.params.articleId })
      .populate('author', 'name')
      .then(article => {
        res.status(200).json(article)
      })
      .catch(err => { next(err) })
  }
  static findMyArticle(req, res, next) {
    Article.find({ author: req.user._id })
      .sort({ created: 'desc' })
      .populate('author', 'name')
      .then(articles => res.status(200).json(articles))
      .catch(err => { next(err) })
  }
  static findByTag(req, res, next) {
    Article.find({tags: req.query.tag})
      .then(arts => {
        res.status(200).json(arts)
      })
      .catch(err => {
        next(err)
      })
  }
  static update(req, res, next) {
    // console.log({ masuk: 'update', prevFile: req.prevFile, reqbody: req.body })
    let { title, content, tags } = req.body
    if (typeof tags == 'string') {
      tags = (tags.length > 0) ? tags.split(',') : []
    }
    let featuredImg = req.prevFile.featuredImg
    if (req.file) {
      featuredImg = (req.file.cloudStoragePublicUrl) ? req.file.cloudStoragePublicUrl : req.prevFile.featuredImg
    }
    let updated = {
      title, content, tags, featuredImg,
      modified: new Date()
    }
    Article.findOneAndUpdate({ _id: req.params.articleId }, updated, { new: true })
      .then(article => {
        res.status(200).json(article)
      })
      .catch(err => { next(err) })
  }
  static delete(req, res, next) {
    Article.findOneAndDelete({ _id: req.params.articleId })
      .then(article => {
        const response = {
          message: 'Successfully deleted article.',
          id: req.params.articleId
        }
        res.status(200).json(response)
      })
      .catch(err => { next(err) })
  }
}

module.exports = ControllerArticle
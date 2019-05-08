const ArticleModel = require('../models/Article')

class Article {
  static findAll (req, res) {
    let query = {
      authorId: req.user.id
    }

    if (req.query.q) {
      query = {
        ...query,
        $or: [{
          title: {
            $regex: new RegExp(`.*${req.query.q}.*`, 'i')
          }
        }, {
          tags: {
            $elemMatch: {
              name: req.query.q
            }
          }
        }]
      }
    }

    ArticleModel
      .find(query)
      .then(articles => res.status(200).json({ articles }))
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static findById (req, res) {
    ArticleModel
      .findById(req.params.article_id)
      .then(article => {
        if (article) {
          res.status(200).json({ article })
        } else {
          res.status(404).json({ message: 'Article Not Found' })
        }
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static create (req, res) {
    ArticleModel
      .create({
        title: req.body.title,
        coverImg: {
          path: req.file.path,
          originalName: req.file.originalname
        },
        body: req.body.body,
        tags: JSON.parse(req.body.tags),
        authorId: req.user._id
      })
      .then(article => res.status(201).json({ article }))
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static update (req, res) {
    req.article
      .updateOne({
        $set: {
          title: req.body.title,
          coverImg: req.file
            ? {
              path: req.file.path,
              originalName: req.file.originalname
            }
            : undefined,
          body: req.body.body,
          tags: JSON.parse(req.body.tags)
        }
      }, { omitUndefined: true })
      .then(() => ArticleModel.findById(req.article._id))
      .then(article => res.status(200).json({ article }))
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' })
      })
  }

  static delete (req, res) {
    req.article
      .remove()
      .then(article => {
        return res.status(200)
          .json({
            article: {
              _id: article._id
            }
          })
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }
}

module.exports = Article

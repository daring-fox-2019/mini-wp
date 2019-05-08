const ArticleModel = require('../models/Article')

const isAuthor = (req, res, next) => {
  ArticleModel
    .findById(req.params.article_id)
    .then(article => {
      if (article) {
        if (article.authorId === req.user.id) {
          req.article = article
          next()
        } else {
          res.status(401).json({ message: 'Unauthorized Access' })
        }
      } else {
        res.status(404).json({ message: 'Article Not Found' })
      }
    })
    .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
}

module.exports = { isAuthor }

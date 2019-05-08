const Article = require('../models/article');

module.exports = (req, res, next) => {
  const { decoded } = req;
  const { id } = req.params;

  Article.findById(id)
    .populate({
      path: 'creator',
      select: ['_id', 'name', 'email']
    })
    .then(article => {
      if (!article) {
        const err = {
          status: 404,
          message: 'data not found'
        }
        next(err);
      } else {
        if (article.creator._id != decoded.id) {
          const err = {
            status: 401,
            message: 'unauthorized to access'
          }
          next(err);
        } else {
          req.article = article;
          next();
        }
      }
    })
    .catch(err => {
      next(err);
    })
}
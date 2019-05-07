const { Article } = require("../models");

class ArticleController {
  static create(req, res) {
    let newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      published: 0
    });
    newArticle.save().then(article => {
      res.status(201).json(article);
    });
  }
}

module.exports = ArticleController

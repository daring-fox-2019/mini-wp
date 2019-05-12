const Article = require("../models/article");

class ArticleController {
  static getArticles(req, res, next) {
    console.log("getArticles");

    Article.find().sort({ createdAt: -1 })
      .populate({
        path: "userId",
        select: "displayPicture fullName username"
      })
      .then((articles) => {
        console.log("getArticles success")
        res.status(200).json(articles);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getUserArticles(req, res, next) {
    console.log("getUserArticles");

    Article.find({ userId: req.authenticatedUser.id }).sort({ createdAt: -1 })
      .populate({
        path: "userId",
        select: "displayPicture fullName username"
      })
      .then((articles) => {
        console.log("getArticles success")
        res.status(200).json(articles);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getArticle(req, res, next) {
    console.log("getArticle");

    Article.findOne({ _id: req.params.id })
      .populate({
        path: "userId",
        select: "displayPicture fullName username"
      })
      .then((article) => {
        console.log("getArticle success");
        res.status(200).json(article);
      })
      .catch((err) => {
        next(err);
      });
  }

  static createArticle(req, res, next) {
    console.log("createArticle");


    const { title, content, visibility, tags } = req.body;

    let isPrivate = null;

    if (visibility === 'public') {
      isPrivate = false;
    } else {
      isPrivate = true;
    }

    if (req.file === undefined) {
      req.file = {};
    }

    // console.log(req.file.cloudStoragePublicUrl);
    // console.log(req.body);
    // console.log(req.body.tags.split(","))

    const newArticle = {
      title,
      content,
      isPrivate,
      tags: tags.split(","),
      userId: req.authenticatedUser.id,
      featuredImage: req.file.cloudStoragePublicUrl,
    };

    Article.create(newArticle)
      .then((article) => {
        console.log("createArticle success");
        res.status(201).json(article);
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateArticle(req, res, next) {
    console.log("updateArticle");

    const { title, content, visibility, tags } = req.body;

    let isPrivate = null;

    if (visibility === 'public') {
      isPrivate = false;
    } else {
      isPrivate = true;
    }

    const updatedArticle = {
      title,
      content,
      isPrivate,
      tags: tags.split(","),
    };

    if (req.file && req.file.cloudStoragePublicUrl) {
      updatedArticle.featuredImage = req.file.cloudStoragePublicUrl;
    }

    const options = { new: true, useFindAndModify: false };

    Article.findByIdAndUpdate(req.params.id, updatedArticle, options)
      .then((article) => {
        console.log("updateArticle success");
        res.status(200).json(article);
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteArticle(req, res, next) {
    console.log("deleteArticle");

    Article.findOneAndDelete({ _id: req.params.id })
      .then((article) => {
        console.log("deleteArticle success");
        res.status(200).json(article);
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = ArticleController;
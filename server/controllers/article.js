const Article = require('../models/article');

class Controller {
  static findAll(req, res, next) {
    const { search } = req.query;
    let obj = {};
    if (search) {
      obj.title = search;
    }
    Article.find(obj, [], {
      sort:{
          updated: -1
      }
    })
      .populate({
        path: 'creator',
        select: ['_id', 'name', 'email']
      })
      .populate({
        path: 'tags',
      })
      .then(articles => {
        if (articles.length === 0) {
          const err = {
            status: 404,
            message: 'data empty'
          }
          next(err);
        } else {
          res.status(200).json({ message: 'data found', articles });
        }
      })
      .catch(err => {        
        next(err);
      })
  }

  static findAllAuth(req, res, next) {
    const { search } = req.query;
    const { decoded } = req;

    let obj = {
      creator: decoded.id
    };

    if (search) {
      obj.title = search;
    }
    Article.find(obj, [], {
      sort:{
          updated: -1
      }
    })
      .populate({
        path: 'creator',
        select: ['_id', 'name', 'email']
      })
      .populate({
        path: 'tags',
      })
      .then(articles => {
        if (articles.length === 0) {
          const err = {
            status: 404,
            message: 'data empty'
          }
          next(err);
        } else {
          res.status(200).json({ message: 'data found', articles });
        }
      })
      .catch(err => {
        next(err);
      })
  }
  
  static create(req, res, next) {
    const { title, text } = req.body
    const { decoded, tags } = req;
    let imageURL = null;
    
    if (req.file) {
      imageURL = req.file.cloudStoragePublicUrl;
    }
    Article.create({
      title, text,
      imageURL: imageURL || null,
      status: 0,
      tags,
      creator: decoded.id,
      created: new Date(),
      updated: new Date()
    })
      .then(newArticle => {
        res.status(201).json({ message: 'data created', newArticle });
      })
      .catch(err => {
        next(err);
      })
  }
  
  static findOne(req, res, next) {
    const { id } = req.params;
    Article.findById(id)
      .populate({
        path: 'creator',
        select: ['_id', 'name', 'email']
      })
      .populate({
        path: 'tags',
      })
      .then(article => {
        if (!article) {
          const err = {
            status: 404,
            message: 'data not found'
          }
          next(err);
        } else {
          res.status(200).json({ message: 'data found', article });
        }
      })
      .catch(err => {
        next(err);
      })
  }

  static updatePut(req, res, next) {
    const { title, text, status } = req.body
    const { tags } = req;
    let updatedArticle = req.article;
    let imageURL = null;
    
    if (req.file) {
      imageURL = req.file.cloudStoragePublicUrl;
    }
    updatedArticle.title = title;
    updatedArticle.text = text;
    updatedArticle.imageURL = imageURL;
    updatedArticle.status = status;
    updatedArticle.tags = tags
    updatedArticle.updated = new Date();
    updatedArticle.updateOne({
      title, text, status, imageURL, tags, updated: updatedArticle.updated
    })
      .then(info => {
        res.status(201).json({ message: 'data updated', updatedArticle, info });
      })  
      .catch(err => {
        next(err);
      })
  }

  static updatePatch(req, res, next) {
    const { title, text, status } = req.body
    let { article, tags } = req;
    let imageURL = null;
    
    if (req.file) {
      imageURL = req.file.cloudStoragePublicUrl;
    }
    article.title = title || article.title;
    article.text = text || article.text;
    article.imageURL = imageURL || article.imageURL;
    article.status = status || article.status;
    article.tags = tags || article.tags;
    article.updated = new Date();
    article.save()
      .then(updatedArticle => {
        res.status(201).json({ message: 'data updated', updatedArticle });
      })  
      .catch(err => {
        next(err);
      })
  }

  static delete(req, res, next) {
    let { article } = req;
    article.delete()
      .then(deletedArticle => {
        res.status(200).json({ message: 'data deleted', deletedArticle });
      })  
      .catch(err => {
        next(err);
      })
  }
}


module.exports = Controller;
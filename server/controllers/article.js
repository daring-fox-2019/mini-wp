const Article = require('../models/article');

class ArticleController {
    static articleList(req, res, next) {
        let field = {};
        
        if (req.query.title) {
            field.title = {
                $regex: req.query.title,
                $options: 'i'
            };
        } else if (req.query.tags) {
            field.tags = {
                $in: req.query.tags
            };
        }
        
        Article
            .find(field)
            .sort({ created_at: -1 })
            // .limit(10)
            .populate('owner')
            .then(articles => {
                res
                    .status(200)
                    .json(articles);
            })
            .catch(err => {
                next(err);
            })
    }

    static oneArticle(req, res, next) {
        Article
            .findOne({
                _id: req.params.id
            })
            .populate('owner')
            .then(article => {
                if (article) {
                    res
                        .status(200)
                        .json(article);
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Article not found'
                        });
                }
            })
            .catch(err => {
                next(err);
            })
    }


    static addArticle(req, res, next) {
        if (req.body.tags.length > 1) {
            req.body.tags = req.body.tags.split(',').map(tag => tag.replace(/ /g,''))
        }

        let featured_image = '';

        if (req.file) {
            featured_image = req.file.cloudStoragePublicUrl;
        } else {
            featured_image = 'https://www.seaharvest.net.au/wp-content/themes/seaharvest/img/assets/built/compass-blue.png';
        }

        const obj = {
            ...req.body,
            featured_image,
            owner: req.authenticatedUser._id,
        }

        Article
            .create(obj)
            .then(newArticle => {
                res
                    .status(201)
                    .json(newArticle);
            })
            .catch(err => {
                next(err);
            })
    }

    static deleteArticle(req, res, next) {
        Article
            .deleteOne({
                _id: req.params.id,
            })
            .then(result => {
                if (result.n && result.ok) {
                    res
                        .status(200)
                        .json({
                            message: 'Article deleted'
                        });
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Article not found'
                        });
                }
            })
            .catch(err => {
                next(err);
            })
    }

    static updateArticle(req, res, next) {
        console.log(req.body.tags)

        if (req.body.tags.length > 1) {
            req.body.tags = req.body.tags.split(',').map(tag => tag.replace(/ /g,''))
        }
        
        if (req.file) {
            let featured_image = req.file.cloudStoragePublicUrl;
            req.body.featured_image = featured_image;
        } 

        Article
            .updateOne({
                _id: req.params.id
            }, {
                    $set: req.body
                })
            .then(result => {
                if (result.n && result.ok) {
                    res
                        .status(200)
                        .json({
                            message: 'Article updated'
                        });
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Article not found'
                        });
                }
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = ArticleController;

const Article = require('../models/article')
const User = require('../models/user')
const ObjectId = require('mongoose').ObjectId

class ArticleController {
    static findAll(req, res) {
        User.findOne({username: req.user.username})
        .populate('articles')
        .then(result => {
            if(result) {
                result = result.articles.map(x => {
                    x.author = req.user.name
                    return x
                })
                console.log(result);
                res.status(200).json({data: result})
            }
            else {
                res.status(204).json({data: []})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
    }

    static create(req, res) {
        let article = {}
        for(let key of Object.keys(req.body)) {
            if(key !== '_id') {
                article[key] = req.body[key]
            }
        }

        article.featured_image_name = req.file.key
        article.featured_image = req.file.location
        
        console.log(req.file);
        article.author = req.user._id

        let created;

        Article.create(article)
            .then(newArticle => {
                created = newArticle
                return User.findOneAndUpdate({_id: req.user._id}, {$push: {articles: newArticle}} )
            })
            .then(user => {
                res.status(201).json({data: created})
            })
            .catch(err => {
                console.log(`article error...${err}`);
                res.status(500).json({error: err})
            })
    }

    static update(req, res) {
        let updateArticle = {}
        for(let key of Object.keys(req.body)) {
            updateArticle[key] = req.body[key]
        }

        Article.findOneAndUpdate({_id: req.params.id}, updateArticle, {new: true})
            .then(article => {
                res.status(200).json({data: article})
            })
            .catch(err => {
                res.status(500).json({error: err})
            })
    }

    static delete(req, res) {
        Article.findOneAndDelete({_id: req.params.id})
            .then(article => {
                console.log(`delete successfully...`);
                res.status(200).json({data: article})
            })
            .catch(err => {
                res.status(500).json({error: err})
            })
    }

    static search(req, res) {
        User.findOne({_id: req.user._id}).populate('articles')
            .then(user => {
                if(!req.query.query || !req.query.query === "") {
                    res.status(200).json(user.articles)
                }
                else {
                    let findRegex = new RegExp(req.query.query.trim(), "i")
                    let results = user.articles.map(article => {
                        if(findRegex.test(article))
                        {
                            return article
                        }
                    })

                    res.status(200).json(results)
                }
            })
            .catch(err => {
                res.status(500).json({error: err})
            })
    }
}

module.exports = ArticleController
const Article = require('../models/article')

class ArticleController {
    static findAll(req, res) {
        Article.find()
        .then(articles => {
            res.status(200).json(articles)
        })
        .catch(err => {
            res.status(500).json({msg: 'Internal server error'})
        })
    }

    static findOne(req, res) {
        Article.findById(req.params.id)
        .then(articles => {
            res.status(200).json(articles)
        })
        .catch(err => {
            res.status(500).json({msg: 'Internal server error'})
        })
    }

    static create(req, res) {
        const { title, content } = req.body
        Article.create({
            title,
            content
        })
        .then(article => {
            res.status(200).json(article)
        })
        .catch(err => {
            res.status(400).json({msg: err})
        })
    }

    static update(req,res) {
        let obj = {}
        
        for(let key in req.body) {
            obj[key] = req.body[key]
        }

        Article.findOneAndUpdate({_id: req.params.id}, obj, {new:true})
        .then(article => {
            res.status(200).json(article)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static delete(req, res) {
        Article.findByIdAndDelete({_id: req.params.id})
        .then(deletedArticle => {
            res.status(200).json(deletedArticle)
        })
        .catch(err => {
            res.status(500).json({msg: err})
        })
    }
}

module.exports = ArticleController

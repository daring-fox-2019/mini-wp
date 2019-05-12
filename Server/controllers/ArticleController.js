const Article = require('../models/article')

class ArticleController {
    static create(req, res) {
        let inputImage = null
        if (req.file) {
            inputImage = req.file.cloudStoragePublicUrl
        }
        let { title, content, tags } = req.body
        tags = tags.split(',')
        Article
            .create({
                title,
                content,
                image: inputImage,
                user: req.decoded._id,
                createdAt: new Date(),
                tags
            })
            .then(article => {
                article.populate('user', err =>{
                    res.status(201).json(article)
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        let { title, content, tags } = req.body
        tags = tags.split(',')
        let toChange = { title, content, tags }
        if (req.file) toChange.image = req.file.cloudStoragePublicUrl
        Article
            .findOneAndUpdate(
                { _id: req.params.id },
                toChange,
                { new: true })
            .populate('user')
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                res.status(200).json(err)
            })
    }

    static findOne(req, res) {
        Article
            .findOne({ _id: req.params.id })
            .populate('user')
            .then(article => {
                res.status(200).json(article)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findAll(req, res) {
        Article
            .find()
            .populate('user')
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findMine(req, res) {
        Article
            .find({ user: req.decoded._id })
            .populate('user')
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        Article
            .findOneAndDelete({ _id: req.params.id })
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = ArticleController
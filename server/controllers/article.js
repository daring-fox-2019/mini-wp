const { User, Article } = require('../models/')
class articleController {
    static create(req, res) {
        console.log(req.body)
        console.log(req.file)
        let featured_image = "http://storage.googleapis.com/translate-my-pdf-cloud/1555142645610-index.jpeg"
        if(req.file){
            featured_image = req.file.gcsUrl
        }
        const { title, content } = req.body
        const created_at = new Date().toISOString()
        const updated_at = new Date().toISOString()
        const user = req.author       
        Article
            .create({
                title, content, created_at, updated_at, user,featured_image
            })
            .then(succes => {
                res.status(201).json(succes)

            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static listAll(req, res) {
        Article
            .find({})
            .populate('user')
            .then(results => {
                res.status(200).json(results)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static myList(req, res) {
        Article
            .find({ user:req.author })
            .then(results => {
                res.status(200).json(results)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static findOne(req, res) {
        Article.findOne({
            _id: req.params.id
        })
        .populate('user')
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static update(req, res) {
        if(req.file){
            req.body.featured_image =req.file.gcsUrl
        }
        req.body.updated_at = new Date().toISOString()
        Article.updateOne({
            _id: req.params.id
        }, {
                ...req.body
            })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static delete(req, res) {
        Article.deleteOne({
            _id: req.params.id
        })
        .then(() => {
            res.status(200).json({
                message: 'Deleted'
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    

}

module.exports = articleController
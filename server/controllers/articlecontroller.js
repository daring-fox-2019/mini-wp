const Article = require("../models/articlemodel.js")
let objectId = require("mongodb").ObjectID;
const format = require('util').format;

const { Storage } = require('@google-cloud/storage'); // Imports the Google Cloud client library
const storage = new Storage({
    keyFilename: '../serviceaccount.json'
}); // Creates a client

const bucketName = 'miniwp-m43';
const bucket = storage.bucket(bucketName);

class Controller {
    static readAll (req, res) { //Shows all articles belonging to user
        Article.find({ author: req.userData.email })
        .exec()
        .then(articles => {
            // console.log(articles)
            res.status(200).json(articles)
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }

    static readOne (req, res) {
        Article.findById(objectId(req.params.id))
        .exec()
        .then(article => {
            res.status(200).json(article)
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }

    static create (req, res) {
        console.log("Saving article for user:")
        let newArticle = new Article({
            title: req.body.title,
            content: req.body.content,
            created_at: req.body.created_at,
            author: req.userData.email, //From previous middleware
        })

        console.log(req.file)
        newArticle.save((err, article) => {
            if (err) {
                console.log(err)
                res.status(500).json({ err })
            } else {
                res.status(201).json({
                    message: "Successfully saved",
                    article,
                })
            }
        })
    }

    static update(req, res) {
        const input = {}
        if(req.body.title) input.title = req.body.title
        if(req.body.content) input.content = req.body.content

        Article.updateOne({_id: objectId(req.params.id)}, {$set: input})
        .then(article => {
            res.status(200).json(article)
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }

    static delete (req, res) {
        Article.remove({_id: objectId(req.params.id)})
        .exec()
        .then(deleted => {
            res.status(200).json({
                message: "Article deleted"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err })
        })
    }
}

module.exports = Controller
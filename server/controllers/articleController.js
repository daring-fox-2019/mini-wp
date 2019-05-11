const Article = require('../models/article')
const Tag = require('../models/tag')
const ObjectId = require('mongoose').ObjectId

class ArticleController {
    static findAll(req, res) {
        Article.find({author: req.user._id})
        .populate('author')
        .populate('tags')
        .then(result => {
            if(result && result.length > 0) {
                result = result.map(x => {
                    x.author = req.user.name
                    return x
                })
                console.log(result);
                res.status(200).json(result)
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
        let article = {}, tagIds = [], promiseAll = []

        for(let key of Object.keys(req.body)) {
            if(key !== '_id') {
                article[key] = req.body[key]
            }
        }

        /* article.featured_image_name = req.file.cloudStorageObject
        article.featured_image = req.file.cloudStoragePublicUrl */
        article.author = req.user._id

        //process tags
        article.tags = article.tags.split(',')

        article.tags.forEach(x => {
            if(!x) {
                promiseAll.push(Tag.findOneAndUpdate({text: x}, {text: x}, {upsert: true, new: true}))
            }
        });

        Promise.all(promiseAll)
            .then(results => {
                console.log('hasil promise all', results);

                article.tags = results.map(x => x._id)

                Article.create(article)
                .then(newArticle => {
                    res.status(201).json(newArticle)
                })
                .catch(err => {
                    console.log(`article error...${err}`);
                    res.status(500).json(err)
                })
            })
            .catch(err => {
                console.log(err.message);
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
                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        Article.findOneAndDelete({_id: req.params.id})
            .then(article => {
                console.log(`delete successfully...`);
                res.status(200).json({data: article})
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static search(req, res) {
        Article.find({author: req.user._id}).populate('tags')
            .then(articles => {
                if(!req.query.query || !req.query.query === "") {
                    res.status(200).json(articles)
                }
                else {
                    let findRegex = new RegExp(req.query.query.trim(), "i")
                    let results = articles.map(article => {
                        if(findRegex.test(article))
                        {
                            return article
                        }
                    })

                    res.status(200).json(results)
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = ArticleController
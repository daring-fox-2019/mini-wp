const Article = require('../models/article')
const Tag = require('../models/tag')

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

    static findOne(req, res) {
        Article.findOne({_id: req.params.id})
        .populate('comment')
        .populate('author')
        .populate('tags')
        .then(result => {
            if(result) {
                res.status(200).json(result)
            }
            else {
                res.status(400).json('Post ID not existed')
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
    }

    static create(req, res) {
        let article = {}, tagIds = [], promises = []

        for(let key of Object.keys(req.body)) {
            if(key !== '_id') {
                article[key] = req.body[key]
            }
        }

        if(req.file) {
            article.featured_image_name = req.file.cloudStorageObject
            article.featured_image = req.file.cloudStoragePublicUrl
        }
        else {
            article.featured_image_name = 'user.png'
            article.featured_image = "https://storage.googleapis.com/miniwp-images/user.png"
        }

        article.author = req.user._id

        //process tags
        article.tags = article.tags.split(',')

        promises = article.tags.map(x => {
            if(x) {
                return Tag.findOneAndUpdate({text: x}, {$setOnInsert: {text: x}}, {upsert: true, new: true})
            }
            else {
                // console.log('empty tag...');
            }
        });

        Promise.all(promises)
            .then(results => {
                article.tags = results.map(x => x._id)

                Article.create(article)
                .then(newArticle => {
                    res.status(201).json(newArticle)
                })
                .catch(err => {
                    console.log(`create article error...${err}`);
                    res.status(500).json(err)
                })
            })
            .catch(err => {
                console.log('promise all error ', err);
            })
    }

    static update(req, res) {
        let article = {}, promises = []
        for(let key of Object.keys(req.body)) {
            article[key] = req.body[key]
        }

        if(req.file) {
            article.featured_image_name = req.file.cloudStorageObject
            article.featured_image = req.file.cloudStoragePublicUrl
        }
        else {
            article.featured_image_name = 'user.png'
            article.featured_image = "https://storage.googleapis.com/miniwp-images/user.png"
        }
        
        article.tags = !article.tags.length ? article.tags.split(',') : article.tags
        console.log(article);

        promises = article.tags.map(x => {
            if(x) {
                return Tag.findOneAndUpdate({text: x}, {$setOnInsert: {text: x}}, {upsert: true, new: true})
            }
            else {
                // console.log('empty tag...');
            }
        });

        Promise.all(promises)
            .then(results => {
                article.tags = results.map(x => x._id)

                Article.findOneAndUpdate({_id: req.params.id}, article, {new: true})
                .then(newPost => {
                    console.log('done....', newPost);
                    res.status(200).json(newPost)
                })
                .catch(err => {
                    console.log('update error...', err);
                    res.status(500).json(err)
                })
            })
            .catch(err => {
                console.log('promise all error ', err);
            })
    }

    static delete(req, res) {
        console.log('masuk barangtu..');
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
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

    static random(req, res) {
        Article.countDocuments().exec()
            .then(count => {
                let random = Math.floor(Math.random() * count);
                return Article.findOne().skip(random).exec()
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json()
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

    static findBySlug(req, res) {
        let slug = req.params.slug

        Article.findOne({slug: slug})
        .populate('comment')
        .populate('author')
        .populate('tags')
        .then(result => {
            if(result) {
                res.status(200).json(result)
            }
            else {
                res.status(400).json('Link is not existed')
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
        article.tags = (article.tags && article.tags !== '' ) ? article.tags.split(',') : ''

        // console.log(article);

        if(article.tags && article.tags !== '') {
            promises = article.tags.map(x => {
                if(x && x !== '') {
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
        else {
            article.tags = undefined

            Article.create(article)
                .then(newArticle => {
                    res.status(201).json(newArticle)
                })
                .catch(err => {
                    console.log(`create article error...${err}`);
                    res.status(500).json(err)
                })
        }
        
    }

    static update(req, res) {
        let article = {}, promises = [], origArticle
        for(let key of Object.keys(req.body)) {
            if(key !== 'featured_image' && key !== 'featured_image_name' && key !== 'comments')
            {
                article[key] = req.body[key]
            }
        }
        article.author = req.user._id

        if(article.tags && article.tags.length > 0) {
            article.tags = article.tags.split(',')
        }
        else {
            article.tags = []
        }

        promises = article.tags.map(x => {
            if(x) {
                return Tag.findOneAndUpdate({text: x}, {$setOnInsert: {text: x}}, {upsert: true, new: true})
            }
            else {
                // console.log('empty tag...');
            }
        });

        if(promises.length > 0) {
            Promise.all(promises)
                .then(results => {
                    article.tags = results.map(x => x._id)

                    Article.findOne({_id: req.params.id})
                    .then(found => {
                        origArticle = found
                        origArticle.tags = article.tags

                        for(let key of Object.keys(article)) {
                            origArticle[key] = article[key]
                        }

                        //update if image is change
                        if(req.file) {
                            origArticle.featured_image_name = req.file.cloudStorageObject
                            origArticle.featured_image = req.file.cloudStoragePublicUrl
                        }

                        return origArticle.save()
                    })
                    .then(newPost => {
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
        else {
            Article.findOne({_id: req.params.id})
                .then(found => {
                    origArticle = found
                    origArticle.tags = []

                    for(let key of Object.keys(article)) {
                        origArticle[key] = article[key]
                    }
                    //update if image is change
                    if(req.file) {
                        origArticle.featured_image_name = req.file.cloudStorageObject
                        origArticle.featured_image = req.file.cloudStoragePublicUrl
                    }

                    return origArticle.save()
                })
                .then(newPost => {
                    res.status(200).json(newPost)
                })
                .catch(err => {
                    console.log('update error...', err);
                    res.status(500).json(err)
                })
        }
    }

    static delete(req, res) {
        Article.findOneAndDelete({_id: req.params.id})
            .then(article => {
                res.status(200).json(article)
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
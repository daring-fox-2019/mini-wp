const route = require('express').Router()
const articleRoute = require('./article')
const userRoute = require('./user')
const authenticate = require('../middleware/authenticate')
const authRoute = require('./auth')
const tagRoute = require('./tag')
const exploreRoute = require('./explore')
const Article = require('../models/article')
const Tag = require('../models/tag')

route.use('/articles', articleRoute)
route.use('/explore', exploreRoute)
route.use('/auth', authRoute)
route.use('/user', authenticate, userRoute)
route.use('/tags', tagRoute)

route.get('/tag/:tagText', (req, res) => {
    Tag.findOne({text: req.params.tagText})
        .then(tag => {
            if(tag) {
                Article.find({tags: tag._id})
                    .populate('comment')
                    .populate('tags')
                    .then(list => {
                        console.log(list);
                        res.status(200).json(list)
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json(err.message)
                    })
            }
            else {
                res.status(400).json('Tag is invalid')
            }
        })
})

route.get('/', (req, res) => {
    res.send('Welcome to Mini WP. Please register/sign in to access the service')
})

module.exports = route
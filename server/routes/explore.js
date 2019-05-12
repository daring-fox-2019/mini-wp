const route = require('express').Router()
const articleController = require('../controllers/articleController')

route.get('/random', articleController.random)
route.get('/:slug', articleController.findBySlug)

module.exports = route
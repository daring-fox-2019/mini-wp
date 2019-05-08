const route = require('express').Router()
const { Authentication } = require('../middlewares/Authenticate')
const {ArticleController} = require('../controllers')

route.post('/', Authentication, ArticleController.create)
route.get('/', Authentication, ArticleController.findAll)
route.patch('/', Authentication, ArticleController.update)
route.delete('/', Authentication, ArticleController.delete)

module.exports = route
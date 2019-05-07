const route = require('express').Router()
const { Authentication } = require('../middlewares/Authenticate')
const {ArticleController} = require('../controllers')

route.post('/', Authentication, ArticleController.create)

module.exports = route
const route = require('express').Router()
const Article = require('./article.js')
const User = require('./user')

route.use('/article', Article)
route.use('/user', User)

module.exports = route
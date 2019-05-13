const routes = require('express').Router()

routes.use('/auth', require('./auth'))
routes.use('/articles', require('./articles'))

module.exports = routes

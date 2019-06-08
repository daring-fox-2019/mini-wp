const express = require('express');
const routes = express.Router();
const articles = require('./articles')
const users = require('./users')
const Authentication = require('../middlewares/authenticate')

routes.use('/articles', Authentication, articles)
routes.use('/users', users)

routes.get('*', (req, res) => {
    res.send('404 page not found')
})

module.exports = routes
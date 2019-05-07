const express = require('express');
const routes = express.Router();
const articles = require('./articles')

routes.use('/articles', articles)
// routes.use('/users', users)

routes.get('*', (req, res) => {
    res.send('404 page not found')
})

module.exports = routes
const express = require('express');
const routes = express.Router();
const ArticleController = require('../controllers/ArticleController')

routes.get('/', ArticleController.findAll)
routes.get('/:id', ArticleController.findOne)
routes.post('/', ArticleController.create)
routes.put('/:id', ArticleController.update)
routes.patch('/:id', ArticleController.update)
routes.delete('/:id', ArticleController.delete)
// routes.use('/users', users)

routes.get('*', (req, res) => {
    res.send('404 page not found')
})

module.exports = routes
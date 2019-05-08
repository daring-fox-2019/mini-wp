const routes = require('express').Router()

const ArticleController = require('../controllers/Article')
const { loggedIn } = require('../middlewares/auth')
const { isAuthor } = require('../middlewares/articles')

routes.use('/', loggedIn)

routes.get('/', ArticleController.findAll)
routes.post('/', ArticleController.create)
routes.get('/:article_id', ArticleController.findById)

routes.use('/:article_id', isAuthor)

routes.put('/:article_id', ArticleController.update)
routes.delete('/:article_id', ArticleController.delete)

module.exports = routes

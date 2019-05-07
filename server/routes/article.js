const route = require('express').Router()
const ArticleController = require('../controllers/articleController')
const uploadLocal = require('../helpers/uploadLocal')
const uploadAWS = require('../helpers/uploadAWS')
const authorize = require('../middleware/authorize')

route.get('/', ArticleController.findAll)
// route.post('/', uploadLocal.single('featured_image'), ArticleController.create)
route.post('/', uploadAWS.single('featured_image'), ArticleController.create)

route.put('/:id', authorize, ArticleController.update)
route.patch('/:id', authorize, ArticleController.update)
route.delete('/:id', authorize, ArticleController.delete)
route.get('/search/:query', ArticleController.search)

module.exports = route
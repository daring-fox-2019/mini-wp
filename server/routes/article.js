const route = require('express').Router()
const ArticleController = require('../controllers/articleController')
const {multer, sendUploadToGCS} = require('../helpers/images')
const authorize = require('../middleware/authorize')

route.get('/', ArticleController.findAll)
route.post('/', multer.single('featured_image') , sendUploadToGCS, ArticleController.create)

route.get('/:id', authorize, ArticleController.findOne)
route.put('/:id', authorize, multer.single('featured_image') , sendUploadToGCS, ArticleController.update)
route.patch('/:id', authorize, ArticleController.update)
route.delete('/:id', authorize, ArticleController.delete)
route.get('/search/:query', ArticleController.search)

route.get('/:slug', ArticleController.findBySlug)

module.exports = route
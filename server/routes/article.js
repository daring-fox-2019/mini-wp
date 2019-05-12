const route = require('express').Router()
const ArticleController = require('../controllers/articleController')
const {multer, sendUploadToGCS} = require('../helpers/images')
const authorize = require('../middleware/authorize')
const authenticate = require('../middleware/authenticate')

route.get('/', authenticate, ArticleController.findAll)
route.post('/', authenticate, multer.single('featured_image') , sendUploadToGCS, ArticleController.create)

route.get('/:id', ArticleController.findOne)
route.put('/:id', authenticate, authorize, multer.single('featured_image') , sendUploadToGCS, ArticleController.update)
route.patch('/:id', authenticate, authorize, ArticleController.update)
route.delete('/:id', authenticate, authorize, ArticleController.delete)
route.get('/search/:query', ArticleController.search)

module.exports = route
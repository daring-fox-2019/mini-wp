const route = require('express').Router()
const { Authentication, Authorization } = require('../middlewares/Authenticate')
const {ArticleController} = require('../controllers')
const { 
  getPublicUrl,
  sendUploadToGCS,
  multer
} = require('../middlewares/images')

route.use(Authentication)
route.post('/', ArticleController.create)
route.get('/', ArticleController.findAll)
route.get("/search", ArticleController.search)
route.post("/upload", multer.single('file'),sendUploadToGCS, ArticleController.upload)
route.patch('/', Authorization, ArticleController.update)
route.delete('/',Authorization, ArticleController.delete)
route.get('/published',ArticleController.findAllPublished)
module.exports = route
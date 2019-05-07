const router = require('express').Router()
const articleController = require('../controllers/article-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const multer = require('../middlewares/multer')
const gcsMiddlewares = require('../middlewares/googleCloudStorage')
const googleVision = require('../middlewares/google-vision')


router.post('/', authentication, multer.single('photo'), gcsMiddlewares.sendUploadToGCS, googleVision, articleController.create)

module.exports = router
const router = require('express').Router()
const multer = require('../middlewares/multer')
const tagController = require('../controllers/tag-controller')
const gcsMiddlewares = require('../middlewares/googleCloudStorage')
const generateTags = require('../middlewares/google-vision')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/', authentication, multer.single('photo'), gcsMiddlewares.sendUploadToGCS, generateTags, tagController.generate)
router.post('/add',tagController.generate)
router.delete('/:id', authentication, authorization, tagController.delete)


module.exports = router
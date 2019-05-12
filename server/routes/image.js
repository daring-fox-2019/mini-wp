const controller = require('../controllers/image')
const router = require('express').Router()
const {authenticate} = require('../middlewares/auth.js')
const {multer, sendUploadToGCS} = require('../middlewares/gcs')
const googleVision = require('../middlewares/google-vision')

// router.get('/',  controller.findAll)
// router.post('/', multer.single("file"), sendUploadToGCS, controller.uploadForPost)
router.post('/', authenticate, multer.single('image'), sendUploadToGCS, googleVision, controller.uploadForPost)
router.post('/wysiwyg', multer.single('file'), sendUploadToGCS, controller.uploadWysiwyg)

module.exports = router
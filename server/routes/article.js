const router = require('express').Router()
const articleController = require('../controllers/article')
const { authentication, authorization } = require('../middleware/auth')
const gcs = require('../middleware/gcs')

router.use(authentication)
router.post('/', gcs.multer.single("image"), gcs.sendUploadToGCS, articleController.create)
router.get('/', articleController.findAll)

router.use('/:id', authorization)
router.get('/:id', articleController.findOne)
router.delete('/:id', articleController.delete)
router.put('/:id', gcs.multer.single("image"), gcs.sendUploadToGCS, articleController.update)

module.exports = router

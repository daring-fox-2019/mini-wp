const router = require('express').Router()
const visionController = require('../controllers/vision')
const gcs = require('../middleware/gcs')

router.post('/', gcs.multer.single("image"), gcs.sendUploadToGCS, visionController.generated)

module.exports = router

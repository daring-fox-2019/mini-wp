const router = require("express").Router()
const post = require('../controllers/post')
const authorize = require('../middlewares/authorize')
const authenticate = require('../middlewares/authenticate')
const upload  = require('../middlewares/upload')
const gcs = require('../middlewares/GCS')

router.use(authenticate)
router.post('/', gcs.multer.single("image_url"), gcs.sendUploadToGCS, post.create)
router.get('/', post.read)

router.get('/:id', authorize, post.readOne)
router.put('/:id', authorize, gcs.multer.single("image_url"), gcs.sendUploadToGCS, post.update)
router.patch('/:id', authorize, gcs.multer.single("image_url"), gcs.sendUploadToGCS, post.update)
router.delete('/:id', authorize, post.delete)

module.exports = router
const router = require("express").Router()
const postCont = require('../controllers/postCont')
const Authorize = require('../middlewares/authorize')
const Authenticate = require('../middlewares/authenticate')
const upload  = require('../middlewares/upload')
const gcs = require('../middlewares/GCS')

router.post('/create', Authenticate, /* gcs.multer.single("image_url"), */ gcs.sendUploadToGCS, postCont.create)
router.get('/read', Authenticate, postCont.read)
router.get('/read/search', Authenticate, postCont.search)
router.get('/read/:_id', Authenticate, Authorize, postCont.readOne)
router.put('/update/:_id', Authenticate, Authorize, /* gcs.multer.single("image_url"), */ gcs.sendUploadToGCS, postCont.update)
router.delete('/delete/:_id', Authenticate, Authorize, postCont.delete)

module.exports = router
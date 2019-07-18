const router = require ('express').Router()
const {TagController} = require('../controllers')
const {authenticate} = require('../middleware/authenticate')
const {authorizedUser} = require('../middleware/authorized')
const images = require('../middleware/images')
const {generateTag} = require('../middleware/tagGenerator')

router.post('/', authenticate, images.multer.single('image'), images.sendUploadToGCS,  generateTag, TagController.generate)
router.post('/user', authenticate, TagController.create)

module.exports = router
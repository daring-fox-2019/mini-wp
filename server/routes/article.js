const router = require ('express').Router()
const {ArticleController} = require('../controllers')
const {authenticate} = require('../middleware/authenticate')
const {authorizedUser} = require('../middleware/authorized')
const images = require('../middleware/images')
const {generateTag} = require('../middleware/tagGenerator')
const {safeImage} = require('../middleware/safeImage')
const {translate} = require('../middleware/translate')


router.get('/translate', translate)
router.get('/all', ArticleController.findFromAllUsers)
router.use(authenticate)
router.get('/', authenticate, ArticleController.findByUser)
router.get('/:id', ArticleController.findOne)
router.post('/', images.multer.single('image'), images.sendUploadToGCS, safeImage, generateTag, ArticleController.create)
router.delete('/:id', authorizedUser, ArticleController.delete)
router.patch('/:id', images.multer.single('image'), images.sendUploadToGCS, generateTag, authorizedUser, ArticleController.update)

// router.get('/?', ArticleController.findAll)


module.exports = router
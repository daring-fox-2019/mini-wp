const router = require ('express').Router()
const {ArticleController} = require('../controllers')
const {authenticate} = require('../middleware/authenticate')
const {authorizedUser} = require('../middleware/authorized')
const images = require('../middleware/images')
const {generateTag} = require('../middleware/tagGenerator')
const {safeImage} = require('../middleware/safeImage')
const {translate} = require('../middleware/translate')


router.post('/translate', translate)
router.get('/all', ArticleController.findFromAllUsers)
router.use(authenticate)
router.get('/', authenticate, ArticleController.findByUser)
router.get('/query/?', ArticleController.findAll)
router.get('/:id', ArticleController.findOne)
router.put('/:id', images.multer.single('image'), images.sendUploadToGCS, generateTag, authorizedUser, ArticleController.update)
router.delete('/:id', authorizedUser, ArticleController.delete)
router.post('/', images.multer.single('image'), images.sendUploadToGCS, safeImage, generateTag, ArticleController.create)



module.exports = router
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
router.get('/',authenticate, ArticleController.findByUser)
router.get('/likes', authenticate, ArticleController.getLikes)
router.get('/query/?',authenticate, ArticleController.findAll)
router.get('/:id', authenticate, ArticleController.findOne)
router.put('/like/:id',authenticate,  ArticleController.like)
router.put('/:id',authenticate,  images.multer.single('image'), images.sendUploadToGCS, generateTag, authorizedUser, ArticleController.update)
router.delete('/:id',authenticate, authorizedUser, ArticleController.delete)
router.post('/', authenticate, images.multer.single('image'), images.sendUploadToGCS, safeImage, generateTag, ArticleController.create)



module.exports = router
const userController = require('../controllers/user-controller')
const router = require('express').Router()
const multer = require('../middlewares/multer')
const gcsMiddlewares = require('../middlewares/googleCloudStorage')

router.post('/register', multer.single('profilePicture'), gcsMiddlewares.sendUploadToGCS, userController.register)
router.post('/login', userController.login)
router.post('/google', userController.google)

module.exports = router
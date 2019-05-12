const router = require('express').Router()
const userController = require('../controllers/userController.js')
const images = require('../helpers/images.js')

router.use('/users', require('./userRoutes.js'))
router.use('/articles', require('./articleRoutes'))
router.post('/signIn', userController.signIn)
router.post('/register', userController.create)
router.post('/upload',
  images.multer.single('image'), 
  images.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })

module.exports = router
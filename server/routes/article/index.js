const express = require('express')
const router = express.Router()
const articleController = require('../../controllers/articleController')
const authenticate = require('../../middlewares/authenticate')
const authorize = require('../../middlewares/authorize')
const images = require('../../helpers/images')

router.use(authenticate)
router.get('/', articleController.findAll)
router.post('/', articleController.create)

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

router.patch('/:ArticleId', authorize, articleController.update)
router.delete('/:ArticleId', authorize, articleController.delete)

// router.post('/', multer.single('image'), gcsMiddlewares.sendUploadToGCS, articleController.create)
// router.patch('/:ArticleId', authorize, multer.single('image'), gcsMiddlewares.sendUploadToGCS, articleController.update)
// router.delete('/:ArticleId', authorize, articleController.delete)

module.exports = router
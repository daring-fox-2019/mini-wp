const express = require('express')
const router = express.Router()
const ArticleController = require('../controller/article')
const {isUser, isAuthorize} = require('../middlewares')
const images = require('../helper/images')
// router.get('/',userController)
// ,images.multer.single('image'), images.sendUploadToGCS
router.use(isUser)
router.post('/add',images.multer.single('image'), images.sendUploadToGCS, ArticleController.addArticle)
router.get('/read',ArticleController.readArticle)
router.delete('/delete/:id',isAuthorize,ArticleController.deleteArticle)
router.patch('/edit/:id',isAuthorize, images.multer.single('image'), images.sendUploadToGCS,ArticleController.updateArticle)
router.get('/all',ArticleController.allArticles)
// router.post('/signin',userController.signIn)
// router.post('/googlesignin',userController.signInGoogle)

// router.post('/upload',
//   images.multer.single('image'), 
//   images.sendUploadToGCS,
//   (req, res) => {
//     res.send({
//       status: 200,
//       message: 'Your file is successfully uploaded',
//       link: req.file.cloudStoragePublicUrl
//     })
//   })




module.exports = router
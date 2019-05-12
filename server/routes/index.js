const router = require('express').Router()
const articleController = require('../controllers/articleController')
const userController = require('../controllers/userController')
const authenticate = require('../middlewares/authenticate')
const upload = require('../helpers/images')


router.get('/users',userController.getAll)
router.post('/register',userController.create)
router.post('/login',userController.login)
router.post('/googleLogin',userController.loginGoogle)


router.use(authenticate)

router.get("/articles",articleController.getAll)
router.get("/myArticles",articleController.getMyArticles)
router.post("/articles",upload.multer.single('image'),upload.sendUploadToGCS,articleController.create)
router.get("/articles/:id",articleController.getOne)
router.patch("/articles/:id",upload.multer.single('image'),upload.sendUploadToGCS,articleController.replace)
router.delete("/articles/:id",articleController.delete)


// upload image 

// router.post("/upload",
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


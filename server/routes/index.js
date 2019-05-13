const route = require('express').Router()
const { ControllerUser, ControllerArticle } = require('../controllers')
const { authenticate, authorize } = require('../middlewares/auth')
const images = require('../helpers/images')

route.get('/', (req, res) => { res.status(200).json({ page: 'Home' }) })
route.post('/register', ControllerUser.create)
route.post('/login', ControllerUser.login)
route.post('/auth/google', ControllerUser.googleSignIn)

route.get('/users', ControllerUser.findAll)
route.get('/users/:id', authenticate)
route.get('/users/:id', ControllerUser.findOne)
route.put('/users/:id', ControllerUser.update)
route.delete('/users/:id', ControllerUser.delete)

route.use(authenticate)
route.post('/articles', images.multer.single('image'), images.sendUploadToGCS, ControllerArticle.create)
route.get('/articles', ControllerArticle.findAll)
route.get('/articles/tag', ControllerArticle.findByTag)
route.get('/articles/myArticles', ControllerArticle.findMyArticle)

route.use('/articles/:articleId', authorize)
route.get('/articles/:articleId', ControllerArticle.findOne)
route.put('/articles/:articleId', images.multer.single('image'), images.sendUploadToGCS, ControllerArticle.update)
route.delete('/articles/:articleId', ControllerArticle.delete)

route.post('/upload', images.multer.single('image'), images.sendUploadToGCS, (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })


route.use('/*', (req, res) => res.status(404).json({ error: 'Not Found :(' }))

module.exports = route
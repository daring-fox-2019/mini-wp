const route = require('express').Router()
const { ControllerArticle } = require('../controllers')
const { ControllerUser } = require('../controllers')
const { authenticate } = require('../middlewares/auth')
const { authorize } = require('../middlewares/auth')
const images = require('../helpers/images')

route.get('/', (req, res) => {res.status(200).json({message: 'Home'})})
route.post('/register', ControllerUser.create)
route.post('/login', ControllerUser.login)
route.post('/authenticate',authenticate,(req,res)=>{
    res.status(200).json({
        message : 'welcome back'
    })
})
route.post('/google/login',ControllerUser.loginGoogle)
route.get('/articles',authenticate, ControllerArticle.findAll)
route.post('/articles',
    authenticate,
    images.multer.single('image'),
    images.sendUploadToGCS,
    ControllerArticle.create)
route.get('/articles/:id', authenticate, ControllerArticle.findOne)
route.put('/articles/:id',
    authenticate,
    images.multer.single('image'),
    authorize,
    images.sendUploadToGCS,
    ControllerArticle.update)
route.delete('/articles/:id',authenticate,authorize, ControllerArticle.delete)
route.use('/*', (req, res) => res.status(404).json({error: 'Not Found :('}))

module.exports = route
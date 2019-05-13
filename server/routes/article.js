const controller = require('../controllers/article')
const router = require('express').Router()
const {authenticate, authorize} = require('../middlewares/auth.js')

router.get('/user', authenticate, controller.getAllUserArticle)
router.get('/', controller.findAll)
router.get('/:id', controller.findOne)

//authentication
router.use(authenticate)
router.post('/', controller.create)
router.patch('/:id/claps', controller.clap)

//authorization
router.use('/:id', authorize)
router.patch('/:id', controller.updateOne)
router.delete('/:id', controller.deleteOne)

module.exports = router
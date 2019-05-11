const router = require('express').Router()
const controller = require('../controller/blogs-con')
const user = require('./user')
const auth = require('../middlewares/auth')

router.use('/user', user)
router.use(auth.authenticate)
router.get('/all',controller.findAll)
router.get('/', controller.showAll)
router.post('/', controller.create)
router.patch('/:id', auth.authorUpdate, controller.updateOne)
router.put('/:id', auth.authorUpdate, controller.update)
router.delete('/:id', auth.authorDelete,controller.delete)
router.get('/:tag',controller.findAllbyTag)

module.exports = router
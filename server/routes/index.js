const router = require('express').Router()
const controller = require('../controller/blogs-con')
const user = require('./user')
const auth = require('../middlewares/auth')

router.use('/user', user)
router.get('/', auth.authenticate, controller.showAll)
router.post('/', auth.authenticate, controller.create)
router.patch('/:id', auth.authenticate, auth.authorUpdate, controller.updateOne)
router.put('/:id', auth.authenticate, auth.authorUpdate, controller.update)
router.delete('/:id', auth.authenticate, auth.authorDelete,controller.delete)

module.exports = router
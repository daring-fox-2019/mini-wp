const router = require('express').Router()
const controller = require('../controller/blogs-con')
const user = require('./user')
const auth = require('../middlewares/auth')

router.use('/user', user)
router.get('/', auth.authenticate, controller.showAll)
router.post('/', auth.authenticate, controller.create)
router.patch('/', auth.authenticate, controller.updateOne)
router.put('/', auth.authenticate, controller.update)
router.delete('/', auth.authenticate, controller.delete)

module.exports = router
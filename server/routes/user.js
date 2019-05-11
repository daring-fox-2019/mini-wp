const router = require('express').Router()
const controller = require('../controller/users-con')

router.get('/:id', controller.showOne)
router.get('/', controller.showAllUser)
router.post('/register', controller.register)
router.post('/login', controller.login)
router.put('/', controller.updateUser)
router.delete('/', controller.deleteUser)

module.exports = router
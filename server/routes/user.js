const router = require('express').Router()
const controller = require('../controller/blogs-con')

router.get('/:id', controller.showOne)
router.get('/', controller.showAllUser)
router.post('/register', controller.register)
router.post('/login', controller.login)
router.put('/update', controller.update)
router.delete('/delete', controller.deleteUser)

module.exports = router
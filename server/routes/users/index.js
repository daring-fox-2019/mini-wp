const userController = require('../../controllers/user')
const router = require('express').Router()

router.post('/register', userController.postCreate)
router.post('/login', userController.postLogin)

module.exports = router
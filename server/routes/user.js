const router = require('express').Router()
const userController = require('../controllers/user')

router.post('/signup', userController.create)
router.post('/signin', userController.signin)
router.post('/signinGoogle', userController.googleLogin)

module.exports = router

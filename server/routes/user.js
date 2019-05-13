const controller = require('../controllers/user')
const router = require('express').Router()
const {googleVerify} = require('../middlewares/google-verify')

router.post('/login', controller.login)
router.post('/register', controller.register)
router.post('/google-login', googleVerify, controller.googleLogin)

module.exports = router
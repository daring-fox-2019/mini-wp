const router = require('express').Router()
const {User} = require('../controllers')



router.post('/register',User.register)
router.post('/login',User.login)
router.post('/googleLogin',User.googleLogin)








module.exports = router
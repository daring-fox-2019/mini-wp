const User = require('../../controllers/user')
const router = require('express').Router()

router.post('/google-sign-in', User.googleSignIn)

module.exports = router
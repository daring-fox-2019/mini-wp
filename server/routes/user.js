const express = require('express')
const router = express.Router()
const userController = require('../controller/user')

// router.get('/',userController)
router.post('/signup',userController.signUp)
router.post('/signin',userController.signIn)
router.post('/googleSignin',userController.signInGoogle)





module.exports = router
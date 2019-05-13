const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const authenticate = require('../../middlewares/authenticate')

router.post('/signUp', userController.signUp)
router.post('/signIn', userController.signIn)
router.post('/googleSignIn', userController.googleSignIn)
  
module.exports = router
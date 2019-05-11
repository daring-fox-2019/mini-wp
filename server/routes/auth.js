const route = require('express').Router()
const AuthController = require('../controllers/authController')

route.post('/signup', AuthController.signup)
route.post('/signin', AuthController.signin)
route.post('/google', AuthController.googleSignIn)
// route.post('/linkedin', AuthController.linkedinSignIn)

module.exports = route
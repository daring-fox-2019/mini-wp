const route = require('express').Router()
const UserController = require('../controllers/UserController')

route.post('/register', UserController.register)
route.post('/signIn', UserController.signIn)

route.post('/googleSignIn', UserController.googleSignIn)

// Not used by client
route.get('/:id', UserController.findOne)
route.get('/', UserController.findAll)
// Not used by client

module.exports = route
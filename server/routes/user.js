const route = require('express').Router()
const UserController = require('../controllers/userController')
const authorize = require('../middleware/authorize')

route.get('/', UserController.findOne)
route.put('/:username', authorize, UserController.update)
route.patch('/:username', authorize, UserController.update)
route.delete('/:username', authorize, UserController.delete)

module.exports = route
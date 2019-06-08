const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/UserController')

routes.get('/', UserController.list)
routes.post('/signin', UserController.signin)
routes.post('/signinGoogle', UserController.signInGoogle)
routes.post('/signup', UserController.signup)

module.exports = routes

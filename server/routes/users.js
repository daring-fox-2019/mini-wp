const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/UserController')

routes.use('/users', UserController.list)

module.exports = routes
const route = require('express').Router()
const { UserController } = require("../controllers")

route.get('/', UserController.findAll)
route.post('/', UserController.create)
module.exports = route
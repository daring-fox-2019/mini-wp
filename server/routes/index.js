const route = require('express').Router()

route.use('/user', require('./userRoute'))
route.use('/article', require("./articleRoute"))
route.use('/login', require('./loginRoute'))

module.exports = route
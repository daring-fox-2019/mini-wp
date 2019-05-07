const route = require('express').Router()
const articleRoute = require('./article')
const userRoute = require('./user')
const authenticate = require('../middleware/authenticate')
const authRoute = require('./auth')

route.use('/articles', authenticate, articleRoute)
route.use('/auth', authRoute)
route.use('/user', authenticate, userRoute)

route.get('/', (req, res) => {
    res.send('Welcome to Mini WP. Please register/sign in to access the service')
})

module.exports = route
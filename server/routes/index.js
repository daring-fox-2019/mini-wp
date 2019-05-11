const router = require('express').Router()
const user = require('./user')
const article = require('./article')

router.use('/users', user) 
router.use('/articles', article) 

module.exports = router

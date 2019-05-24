const router = require('express').Router()
const user = require('./user')
const article = require('./article')
const vision = require('./vision')

router.use('/users', user) 
router.use('/articles', article) 
router.use('/vision', vision) 

module.exports = router

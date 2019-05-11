
const router = require('express').Router()
const user = require('./user')
const article = require('./article')

router.use('/user',user)
router.use('/article',article)







module.exports = router
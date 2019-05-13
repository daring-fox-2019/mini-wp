
const router = require('express').Router()
const user = require('./user')
const article = require('./article')
const tag = require('./tag')

router.use('/user',user)
router.use('/article',article)
router.use('/tag',tag)








module.exports = router
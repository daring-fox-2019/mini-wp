const express = require('express')
const router = express.Router()
const articles = require('./article')
const users = require('./user')

router.use('/articles', articles)
router.use('/users', users)

module.exports = router
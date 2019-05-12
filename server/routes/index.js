const router = require('express').Router()
const Article = require('./articles')
const User = require('./users')
const Oauth = require('./oauth')
const upload = require('./routesBride')

router.use('/articles', Article)
router.use('/users', User)
router.use('/upload' , upload)
router.use('/oauth', Oauth)

module.exports = router
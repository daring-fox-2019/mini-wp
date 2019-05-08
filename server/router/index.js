const router = require('express').Router()
const articleRouter = require('./articleRouter')


router.use('/articles',articleRouter)


module.exports = router
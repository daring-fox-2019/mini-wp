const router = require('express').Router()
const userRouter = require('./user.js')
const articleRouter = require('./article.js')
const imageRouter = require('./image.js')

router.use('/users', userRouter)
router.use('/articles', articleRouter)
router.use('/images', imageRouter)

module.exports = router
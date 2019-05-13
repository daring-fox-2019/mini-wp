const router = require('express').Router()
const userRouter = require('./user.js')
const articleRouter = require('./article.js')
const imageRouter = require('./image.js')

router.use('/users', userRouter)
router.use('/articles', articleRouter)
router.use('/images', imageRouter)

router.get('/*', (req,res) => {
    res.status(404).json('not found 404')
})

module.exports = router
const router = require('express').Router();
const articleRouter = require('./article')
const authRouter = require('./auth')

router.use('/auth',authRouter)
router.use('/post',articleRouter)
router.use('/home',articleRouter)


module.exports = router
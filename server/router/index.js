const router = require('express').Router();
const articleRouter = require('./article')
const authRouter = require('./auth')
const article = require('../controller/article')
const auth = require('../controller/auth')

router.use('/auth',authRouter)
router.get('/post-home',article.GetHomeArticles)
router.use(auth.authorize)
router.use('/post',articleRouter)

module.exports = router
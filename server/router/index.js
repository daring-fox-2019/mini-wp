const router = require('express').Router();
const postRuter = require('./post')
const authRouter = require('./auth')

// const todoRouter = require('./todo')
// const {Authentication,Authorization} = require('../middlewares')


// router.post('')
router.use('/auth',authRuter)
router.use('/posts',postRuter)
// router.use('/users',memberRouter)
// router.use('/todos',todoRouter)

module.exports = router
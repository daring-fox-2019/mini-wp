const express = require('express')
const router =  express.Router()
const userRouter = require('./user')
const articleRouter = require('./article')

// router.get('/',(req,res)=>{
//   res.send(`masuk ke halaman index`)
// })

router.use('/users',userRouter)
router.use('/articles',articleRouter)

module.exports = router
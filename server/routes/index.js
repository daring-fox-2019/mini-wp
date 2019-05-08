const router = require('express').Router()
const article = require('./article')
const user = require('./user')
const tags = require('./tags')
const {googleTalent} = require('../middleware/googleTalent')

router.get('/', (req, res) => {
    res.status(200).json({msg : 'connected'})
})

// router.get('/talent', googleTalent)

router.use('/users', user)
router.use('/articles', article)
router.use('/tags', tags)


module.exports = router
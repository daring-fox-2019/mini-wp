const router = require('express').Router()
const {generate} = require('../helpers/googlevision')
const filepath = require('../middlewares/filepath')
const auth = require('../middlewares/authenticate')

console.log('masuk router tag')
router.post ('/generate',filepath,generate)











module.exports = router
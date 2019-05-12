const express = require('express')
const router = express.Router()
const user = require('../controllers/userController')

router.post('/register', user.Register)
router.post('/login', user.Login)

module.exports = router
const router = require("express").Router()
const user = require('../controllers/user')

router.post('/register', user.register)
router.post('/login',user.login)
router.post('/signingoogle', user.GoogleSignIn)
// router.update('/update/:id', user.update)
// router.delete('/delete/:id', user.delete)

module.exports = router
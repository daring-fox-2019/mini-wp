const router = require("express").Router()
const UserCont = require('../controllers/userCont')

router.post('/register', UserCont.register)
router.post('/login',UserCont.login)
router.post('/signingoogle', UserCont.GoogleSignIn)
// router.update('/update/:id', UserCont.update)
// router.delete('/delete/:id', UserCont.delete)

module.exports = router
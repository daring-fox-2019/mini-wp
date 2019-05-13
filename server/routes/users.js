const router = require("express").Router()
const Controller = require("../controllers/usercontroller.js")
const checkAuthentication = require("../middleware/checkAuthentication.js")

router.post("/register", Controller.create)
router.post("/login", Controller.login)
router.put("/", checkAuthentication, Controller.update)
router.delete("/", checkAuthentication, Controller.delete)

module.exports = router;
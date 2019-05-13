const router = require("express").Router()

router.use("/users", require("./users.js"))
router.use("/articles", require("./articles.js"))

module.exports = router;
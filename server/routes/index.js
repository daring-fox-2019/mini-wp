const router = require("express").Router()
const post = require('./post')
const user = require("./user")

router.get("/", (req, res) => {
  res.status(200).json({ message : 'API connected' })
})

router.use("/posts", post)
router.use("/users", user)

module.exports = router
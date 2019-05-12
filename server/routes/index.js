const router = require("express").Router()
const post = require('./postRoutes')
const user = require("./userRoutes")

router.get("/", (req, res) => {
  res.status(200).json({ msg: 'connected' })
})

router.use("/posts", post)
router.use("/users", user)

module.exports = router
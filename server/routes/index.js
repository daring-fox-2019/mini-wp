const router = require('express').Router()
const articleController = require('../controllers/articleController')

router.get("/articles",articleController.getAll)
router.post("/articles",articleController.create)
router.get("/articles/:id",articleController.getOne)
router.patch("/articles/:id",articleController.replace)
router.delete("/articles/:id",articleController.delete)
module.exports = router

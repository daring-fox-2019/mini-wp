const router = require("express").Router()
const Controller = require("../controllers/articlecontroller.js")
const checkAuthentication = require("../middleware/checkAuthentication.js")
const upload = require("../middleware/uploadToGCS.js")
const Multer = require('multer');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5000000
    }
});

router.get("/", checkAuthentication, Controller.readAll)
router.get("/:articleId", checkAuthentication, Controller.readOne)
router.post("/", checkAuthentication, multer.single('image'), upload, Controller.create)
router.delete("/:articleId", checkAuthentication, Controller.delete)
router.put("/:articleId", checkAuthentication, Controller.update)

module.exports = router;
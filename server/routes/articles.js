const express = require("express");
const ArticleController = require("../controllers/article-controller");
const { authorization } = require("../middlewares/auth");
const { sendUploadToGCS, multer } = require("../middlewares/multer");
const router = express.Router();

router.get("/", ArticleController.getUserArticles);
router.get("/all", ArticleController.getArticles);
router.get("/:id", ArticleController.getArticle);
router.post("/", multer.single("image"), sendUploadToGCS, ArticleController.createArticle);
router.patch("/:id", authorization, multer.single("image"), sendUploadToGCS, ArticleController.updateArticle);
router.delete("/:id", authorization, ArticleController.deleteArticle);

module.exports = router;
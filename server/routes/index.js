const express = require("express");
const usersRouter = require("../routes/users");
const articlesRouter = require("../routes/articles");
const { authentication } = require("../middlewares/auth");
const router = express.Router();

router.use("/api", usersRouter);
router.use("/api/articles", authentication, articlesRouter);

module.exports = router;
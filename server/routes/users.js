const express = require("express");
const UserController = require("../controllers/user-controller");
const router = express.Router();

router.post("/login", UserController.login);
router.post("/google-login", UserController.googleLogin);
router.post("/register", UserController.createUser);

module.exports = router;
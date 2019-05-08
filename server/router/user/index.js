const express = require('express');
const router = express.Router();

const ArticleController = require('../../controllers/article');
const Authenticate = require('../../middlewares/authenticate');

router.use(Authenticate);

router.get('/articles', ArticleController.findAllAuth);


module.exports = router;
const router         = require('express').Router();
const AuthController = require('../controllers/auth');
const ArticleRoute   = require('./article');
const errorHandler = require('../middlewares/errorHandler');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/google-login', AuthController.verify);

router.use('/articles', ArticleRoute);

router.use(errorHandler);

module.exports = router;

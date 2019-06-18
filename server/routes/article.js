const router = require('express').Router();
const ArticleController = require('../controllers/article');
const { multer, sendUploadToGCS } = require('../helpers');
const { authorization, authentication } = require('../middlewares/auth');

router.get('/', ArticleController.articleList);
router.get('/:id', ArticleController.oneArticle);
router.post('/', authentication, multer.single('image'), sendUploadToGCS, ArticleController.addArticle);
router.patch('/:id', authentication, authorization, multer.single('image'), sendUploadToGCS, ArticleController.updateArticle);
router.delete('/:id', authentication, authorization, ArticleController.deleteArticle);

module.exports = router;
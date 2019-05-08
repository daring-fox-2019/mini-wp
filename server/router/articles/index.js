const express = require('express');
const router = express.Router();

const ArticleController = require('../../controllers/article');
const Authenticate = require('../../middlewares/authenticate');
const AuthorizeAuthUser = require('../../middlewares/authorizeAuthUser');

router.get('/', ArticleController.findAll);
router.get('/:id', ArticleController.findOne);

router.use(Authenticate);
router.post('/', ArticleController.create);
router.put('/:id', AuthorizeAuthUser, ArticleController.updatePut);
router.patch('/:id', AuthorizeAuthUser, ArticleController.updatePatch);
router.delete('/:id', AuthorizeAuthUser, ArticleController.delete);


module.exports = router;
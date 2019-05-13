const express = require('express');
const router = express.Router();

const ArticleController = require('../../controllers/article');
const Authenticate = require('../../middlewares/authenticate');
const AuthorizeAuthUser = require('../../middlewares/authorizeAuthUser');
const upload = require('../../middlewares/upload');
const tags = require('../../middlewares/tagsHandler');

router.get('/', ArticleController.findAll);
router.get('/:id', ArticleController.findOne);

router.use(Authenticate);
router.post('/', upload.multer.single('image'), upload.sendUploadToGCS, tags.generate, ArticleController.create);
router.put('/:id', AuthorizeAuthUser, upload.multer.single('image'), upload.sendUploadToGCS, tags.generate, ArticleController.updatePut);
router.patch('/:id', AuthorizeAuthUser, upload.multer.single('image'), upload.sendUploadToGCS, tags.generate, ArticleController.updatePatch);
router.delete('/:id', AuthorizeAuthUser, ArticleController.delete);


module.exports = router;
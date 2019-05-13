const router = require('express').Router();
const article = require('../controller/article')
const {multer,sendUploadToGCS,fromBase64toFile} = require('../helpers/image-utility')

router.get('/',article.Get)
router.get('/:id',article.GetOne)
router.post('/', fromBase64toFile, sendUploadToGCS, article.Post)
router.patch('/:id', fromBase64toFile, sendUploadToGCS, article.Patch)
router.delete('/:id',article.Delete)


module.exports = router
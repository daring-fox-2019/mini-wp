const router = require('express').Router();
const article = require('../controller/article')

router.get('/',article.Get)
router.get('/:id',article.GetOne)
router.post('/',article.Post)
router.patch('/:id',article.Patch)
router.delete('/:id',article.Delete)


module.exports = router
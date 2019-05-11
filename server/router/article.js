const router = require('express').Router();
const article = require('../controller/article')
const auth = require('../controller/auth')



router.use(auth.authorize)
router.get('/',article.Get)
router.get('/:id',article.GetOne)
router.post('/',article.Post)
router.patch('/:id',article.Patch)
router.delete('/:id',article.Delete)


module.exports = router
const express = require('express')
const router = express.Router()
const articles = require('../controllers/articleController')
const Authentication = require('../middlewares/authentication')
const Authentorization = require('../middlewares/authorization')

router.use(Authentication)
router.get('/search/:input', articles.searchArticles)
router.get('/', articles.getArticles)
router.get('/:id', articles.getByIdArticle)
router.post('/', articles.addArticle)

router.use(Authentorization)
router.put('/:id', articles.editArticle)
router.delete('/:id', articles.deleteArticle)

module.exports = router
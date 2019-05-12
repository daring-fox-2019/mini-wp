const express = require('express')
const router = express.Router()
const articles = require('../controllers/articleController')

router.get('/search/:input', articles.searchArticles)
router.get('/', articles.getArticles)
router.get('/:id', articles.getByIdArticle)
router.post('/', articles.addArticle)
router.put('/:id', articles.editArticle)
router.delete('/:id', articles.deleteArticle)

module.exports = router
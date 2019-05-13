const express = require('express')
const router = express.Router()
const articles = require('../controllers/articleController')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.use(Authentication)
router.get('/search/:input', articles.searchArticles)
router.get('/', articles.getArticles)
router.get('/:id', articles.getByIdArticle)
router.post('/', articles.addArticle)

// router.use(Authorization)
router.patch('/:id', articles.editArticle)
router.delete('/:id', articles.deleteArticle)

module.exports = router
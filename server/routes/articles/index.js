const router = require('express').Router()
const articleController = require('../../controllers/article')
const Auth = require('../../middleware/auth')

router.post('/', Auth.authenticate, articleController.postCreate)
router.get('/', Auth.getAllAuth, articleController.getAll)
router.patch('/:id', Auth.authenticate, Auth.authorization, articleController.update)
router.delete('/:id', Auth.authenticate, Auth.authorization, articleController.deleteArticle)
router.post('/translate', articleController.translate)

module.exports = router
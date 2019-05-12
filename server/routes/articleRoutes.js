const articleController = require('../controllers/articleController')
const router = require('express').Router()
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.get('/', authenticate, articleController.getAllByUser)
router.get('/all', authenticate, articleController.getAllArticles)
router.get('/:id', authenticate, articleController.findById)
router.post('/', authenticate, articleController.create)
router.put('/:id', authenticate, authorize, articleController.put)
router.patch('/:id', authenticate, authorize, articleController.patch)
router.delete('/:id', authenticate, authorize, articleController.delete)

module.exports = router
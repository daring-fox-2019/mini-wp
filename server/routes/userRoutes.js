const userController = require('../controllers/userController')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const router = require('express').Router()

router.get('/', authenticate, userController.getAll)
router.get('/:id', authenticate, userController.findById)
router.put('/:id', authenticate, authorize, userController.put)
router.patch('/:id', authenticate, authorize, userController.patch)
router.delete('/:id', authenticate, authorize, userController.delete)

module.exports = router
const router = require('express').Router()
const articleController = require('../controller/articleController')

'localhost:3000/router'

router.get('/', articleController.findAll)
router.post('/', articleController.create)
router.delete('/:id', articleController.delete)

module.exports = router
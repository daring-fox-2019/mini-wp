const router = require('express').Router();
const book = require('../controller/book')
// const serverError = _ =>
router.get('/',book.Get)
router.get('/:id',book.GetOne)
router.post('/',book.Post)
router.put('/:id',book.Put)
router.patch('/:id',book.Patch)
router.delete('/:id',book.Delete)


module.exports = router
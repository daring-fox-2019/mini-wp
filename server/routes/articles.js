const express = require('express');
const routes = express.Router();
const ArticleController = require('../controllers/ArticleController')
const multer  = require('multer')
const upload = multer({ dest: 'public/img' })
const Upload = require('../middlewares/upload')

const Authorize = require('../middlewares/authorize')

routes.get('/', ArticleController.findAll)
routes.get('/myarticle', ArticleController.findAllByOwner)
routes.get('/:id', ArticleController.findOne)
routes.post('/', Upload.multer.single('featured_image'), Upload.sendUploadToGCS, ArticleController.create)
routes.put('/:id', Authorize, Upload.multer.single('featured_image'), Upload.sendUploadToGCS, ArticleController.update)
routes.patch('/:id', Authorize, Upload.multer.single('featured_image'), Upload.sendUploadToGCS, ArticleController.update)
routes.delete('/:id', Authorize, ArticleController.delete)

routes.get('*', (req, res) => {
    res.send('404 page not found')
})

module.exports = routes

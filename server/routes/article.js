const router = require('express').Router()
const {Article} = require('../controllers')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')
const Multer = require('multer')
const path = require('path')
const gcsMiddleware = require('../middlewares/google-cloud-storage')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024 // maximum file 10mb
    },
    fileFilter : function(req, file , inst){
        var extFile = path.extname(file.originalname);
        if(extFile !== ".jpg" && extFile !== ".jpeg" && extFile !== ".png" && extFile !== ".gif"){           
            // skip uploadnya
            inst(null, false)
        } else {
            console.log('masuk')
            inst(null, true)
        }
    }
    
})


router.get('/', Article.listAll)
router.get('/:id', Article.findOne)
router.use(authenticate)
router.post('/', multer.single('file'), gcsMiddleware.sendUploadToGCS, Article.create)
router.get('/user/list', Article.myList)
router.put('/:id',authorize ,multer.single('file'), gcsMiddleware.sendUploadToGCS, Article.update)
router.delete('/:id',authorize, Article.delete)







module.exports = router
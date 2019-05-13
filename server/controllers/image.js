const Image = require('../models/image')
class ImageController {
    static uploadWysiwyg(req,res) {
        //wysiwyg must return a string
        res.status(200).json(req.file.cloudStoragePublicUrl)
    }

    static uploadForPost(req,res) {
        // console.log('masuk uploadfor post')
        // console.log(req.file.cloudStoragePublicUrl)
        // console.log('--------------------------------------')
        Image.create({
            image: req.file.cloudStoragePublicUrl,
            user: req.decoded._id,
            tags: req.file.labels
        })
        .then(created=> {
            res.status(200).json(created)
        })
        .catch(err => {
            res.status(500).json({
                message:'error update picture model',
                err: err.errors.image
            })
        })
    }
}
module.exports = ImageController



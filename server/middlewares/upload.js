var multer  = require('multer')
var upload = multer({ 
  storage: multer.diskStorage({
    destination: function (req, file, next) {
      next(null, '/uploads/images')
    },
    filename: function (req, file, next) {
      const ext = file.mimetype.split("/")[1]
      next(null, file.fieldname + '-' + Date.now() + '-' + ext)
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: function(req,file,next){
    if(!file){
      next({message:"No file attached"},false)
    }
    const isImage = file.mimetype.startsWith('image/')
    if(isImage){
      next(null,true)
    }
    else {
      next({message:"File type not supported"},false)
    }
  }
}).single('imageFile')

module.exports = function (req,res,next){
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(500).json({
        message: "A Multer error occurred when uploading"
      })
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(500).json({
        message: "An unknown error occurred when uploading"
      })
    }
    next()
    // Everything went fine.
  })
}
var multer = require('multer');

const storage = multer.diskStorage({
    destination: './public/images',
    filename: function(req, file, cb) {
        cb(null, Date.now()+'-'+file.originalname)
    }
  });

const upload = multer({ storage });

module.exports = upload
const express = require("express"),
  router = express.Router(),
  Multer = require("multer"),
  gcsMiddlewares = require("../middleware/google-cloud-storage.js");


const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Maximum file size is 10MB
  }
});

router.post("/", multer.single("file"), gcsMiddlewares.sendUploadToGCS, (req, res, next) => {
    if (req.file && req.file.gcsUrl) {
      const link = req.file.gcsUrl
      console.log(link,'======================================')
      res.send(link);
    }
  }
);

// router.use((err, req, res, next) => {
//   console.log(err, "ini error");
//   if (err) {
//     res.status(500).json({
//       error: err.message
//     });
//   }
// });
module.exports = router;
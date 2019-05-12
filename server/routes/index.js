const router = require('express').Router()
const cUser = require('../controllers/user')
const cArticle = require('../controllers/article')
const {authentication} = require("../middlewares/auth")
const {authorization} = require("../middlewares/auth")
const { sendUploadToGCS, multer } = require('../middlewares/uploadtocloud');

router.post("/googleLogin", cUser.signInGoogle)
router.post("/register", cUser.createNewUser) // request data { name, email, password } // response on success {id, name, email, password}
router.post("/login", cUser.signInUser) // request data : {email, password} // response on success {id, name, email, token}

router.use(authentication)
router.get("/articles", cArticle.seeArticles) // request headers : token // response on success [{},{}]

router.post("/articles", cArticle.newArticle) // request headers : token, id data : title, snippet, content, createdAt, updatedAt, postedAt, userId, status, image
// response on success {_id, title, snippet, content, createdAt, updatedAt, postedAt, userId, status, image, __v}
router.put("/articles/:id", authorization, cArticle.updateArticle)
// response on success {_id, title, snippet, content, createdAt, updatedAt, postedAt, userId, status, image, __v}
router.delete("/articles/:id", authorization, cArticle.deleteArticle) // headers : token, id 
// response on success { _id }

router.post("/uploadimg", multer.single('image'), sendUploadToGCS,
   function(res,req,next){
      if (req.file) { 
        res.status(200).json(req.file.cloudStoragePublicUrl);
        // balikin ke client
      } else {
        res.status(500).send('Unable to upload');
      }
   });

/**
 * router.post("/uploadimg", multer.single('image'), sendUploadtoGCS,
 *   function(res,req,next){
 *      if (req.file) { 
 *        res.status(200).json(req.file.cloudStoragePublicUrl);
 *      } else {
 *        res.status(500).send('Unable to upload');
 *      }
 *   });
 */

/**
 * router.use(authentication)
 * 
 * router.get("/articles", cArticle.seeArticles) // see all article by author 
 * headers : token, id
 * 
 * router.get("/filter", cArticle.filterArticle) // filter article by title
 * headers : token, id
 * data : title
 * 
 * router.post("/articles", cArticle.newArticle)
 * headers : token, id
 * data : title, snippet, content, createdAt, updatedAt, postedAt, userId, status, image
 * 
 * router.delete("/articles/:id", authorization, cArticle.deleteArticle)
 * headers : token, id
 * 
 * router.put("/articles/:id", authorization, cArticle.updateArticle)
 * headers : token, id
 * data : title, snippet, content, createdAt, updatedAt, postedAt, userId, status, image
*/

module.exports = router
const Post = require('../models/post')

module.exports = (req, res, next) => {
  // console.log("Authorize",req.decoded._id)
  Post.findOne({_id: req.params._id})
  .then(row =>{
    if(row.user.equals(req.decoded._id)){
      next()
    }
    else{
      res.status(401).json({
        message: 'Not Authorized'
      })
    }
  })
  .catch(err =>{
    res.status(400).json({
      message: "Post gak ketemu"
    })
  })
}
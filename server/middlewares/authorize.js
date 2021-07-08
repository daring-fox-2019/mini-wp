const Post = require('../models/post')

module.exports = (req, res, next) => {
  Post.findById(req.params.id)
    .then(row => {
      if (row) {
        if (row.user.equals(req.decoded._id))
          next()
        else
          next({ code: 401, message: 'Unauthorized' })
      }
      else
        next({ code: 404, message: 'Post not found' })
    })
    .catch(next)
}
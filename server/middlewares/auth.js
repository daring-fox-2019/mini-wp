const { verify } = require('../helpers/jwt');
const { User, Article } = require('../models');

module.exports = {
  authenticate: function(req, res, next) {
    let token = req.headers.token;
    if (!token) {
      next({
        status: 401,
        message: 'You must login to access this endpoint.'
      })
    } else {
      try {
        let decoded = verify(token);
        User
        .findOne({
          // email: decoded.email
          _id: decoded.id
        })
        .then(user => {
          if(user) {
            req.user = user;
            next();
          } else {
            next({
              status: 401,
              message: 'User is not valid.'
            })
          }
        })
        .catch(err => {
          next(err)
        })
      } catch {
        next({
        status: 401,
        message: 'Token Exipred'
      })
      }
    }
  },
  authorize: function(req, res, next) {
    Article.findOne({
      _id: req.params.articleId
    })
      .then(art => {
        // console.log(art.author, req.user._id)
        if(art.author.toString() != req.user._id.toString()) {
          next({
            status: 401,
            message: 'Cannot write other user\'s articles.'
          })
        } else {
          req.prevFile = art
          next()
        }
      })
  },
}

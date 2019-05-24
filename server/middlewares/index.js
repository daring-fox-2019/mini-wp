let jwt = require('jsonwebtoken')
let Article = require('../models/article')

let middlewares = {
  isUser: function (req, res, next) {
    let token = req.headers.token
    // console.log(req.headers);
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        res.status(400).json({ message: 'invalid token' })
      } else {
        req.user = decoded
        next()
      }
    });
  },
  isAuthorize: function (req, res, next) {
    let token = req.headers.token
    // console.log(req.headers);
    console.log(req.user);
      Article.findOne({ _id: req.params.id })
        .then(article => {
          if (article.userId.toString() === req.user.id.toString()) {
            next()
          } else {
            res.status(401).json({ message: 'unauthorize' })
          } 
        })
        .catch(error=>{
          res.status(400).json(error)
        })
    }

  
}

module.exports = middlewares
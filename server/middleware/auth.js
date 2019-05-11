const Article = require('../models/article')
const { verify } = require('../helpers/jwt')

function authentication(req, res, next) {
  if (!req.headers.token) {
    res.status(401).json({ msg: "Unauthorize = Token not found!" })
  }
  let decoded = verify(req.headers.token, res);
  req.userId = decoded._id
  next()
}

function authorization(req, res, next) {
  Article.findOne({ _id: req.params.id })
    .then(data => {
      if (String(data.author) === String(req.userId)) {
        next()
      } else {
        res.status(401).json({ message: 'Unauthorized' })
      }
    })
    .catch(err => {
      res.status(500).json({ err })
    })
}

module.exports = { authentication, authorization }

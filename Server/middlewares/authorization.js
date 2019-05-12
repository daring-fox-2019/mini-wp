const Article = require('../models/article');

module.exports = (req, res, next) => {
    Article.findOne({ _id: req.params.id })
        .then(article => {
            if (article.user.toString() === req.decoded._id.toString()) {
                next()
            }
            else {
                res.status(403).json({ err: "Forbidden" })
            }
        })
        .catch(err => {
            res.status(401).json(err)
        })
}
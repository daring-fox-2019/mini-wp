const { verify } = require('../helpers/jwt')
const Article = require('../models/article-model')

module.exports = (req, res, next) => {
    const decoded = verify(req.headers.token)
    Article
        .findOne({ _id: req.params.id })
        .populate('userId')
        .then((findOneArticle) => {
            console.log(findOneArticle);
            
            if (findOneArticle.userId.email === decoded.email) next()
            else res.status(401).json({ type: 'AUTHORIZATION ERROR', message: 'You do not have access to this page!' })
        })
}
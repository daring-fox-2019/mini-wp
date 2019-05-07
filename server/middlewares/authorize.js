const Article = require('../models/article')

module.exports = (err, req, res, next) => {
    if(req.headers.hasOwnProperty('token')) {
        Article.findOne({owner:req.params.id})
        .then((article) => {
            if(article) {
                if(article.owner==req.decoded.id) {
                    next()
                }else{
                    res.status(400).json([])
                }
            }
        })
        .catch(err => {
            res.status(500).json({'msg': 'Request error'})
        })
    }else {
        res.status(400).json({'msg': 'Not authorize'})
    }
}
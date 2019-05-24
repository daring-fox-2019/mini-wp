const Article = require('../../../../w2/mini-wp/server/models/article')

module.exports = (err, req, res, next) => {
    if(req.headers.hasOwnProperty('token')) {
        Article.findOne({author:req.params.id})
        .then((article) => {
            if(article) {
                if(article.author==req.decoded.id) {
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
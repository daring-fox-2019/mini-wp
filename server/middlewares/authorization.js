const Article = require('../models/article')

module.exports = function(req, res, next){
    console.log(req.params)
    Article.findById({
        _id: req.params.id
    })
    .then(response => {
        console.log(response, 'author')
        if(response){
            if(req.decoded.id == response.author){
                next()
            }else{
                res.status(401).json({
                    msg: "Not Authorized"
                })
            }
        }else{
            res.status(404).json({
                msg: "Post Not Found"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            msg: "Internal Server Error author"
        })
    })
}
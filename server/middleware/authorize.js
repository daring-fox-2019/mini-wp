const Article = require('../models/article')

module.exports = function(req, res, next) {
    let id = req.params.id
    Article.findOne({_id: id})
            .then(article => {
                if(article) {
                    if(article.author.toString() === req.user._id.toString()) {
                        next()
                    }
                    else {
                        res.status(403).json('Forbidden: Not authorized to access this resource')
                    }
                }
                else {
                    res.status(400).json('Invalid article')
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(`Error during authorization. Please try again.`)
            })
}
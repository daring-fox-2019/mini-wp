const jwt = require('jsonwebtoken');
const {Article} = require('../models')

module.exports = {
    authorizedUser  : function(req, res, next) {
        Article.findById(req.params.id)
        .then(article => {
            if (req.authenticatedUser.id.toString() === article.userId.toString()) {
                next ()
            }else {
                console.log("401 : unauthorized");
                res.status(401).json({message : 'You are unauthorized' })
            }
        })
    }
}

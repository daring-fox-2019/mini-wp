const Article = require("../models/articlemodel.js")
let objectId = require("mongodb").ObjectID;

module.exports = (req, res, next) => {
    let tokenUid = req.userData.id

    Article.findById(objectId(req.params.id))
    .exec()
    .then(article => {
        if(article.userId === tokenUid) {
            next()
        }
        else {
            res.status(403).json({
                message: "Permission denied" 
            })
        }
    })
    .catch(err => {
        res.status(500).json({err})
    })
}
const User = require('../models/user')

module.exports = function(req, res, next) {
    let id

    if(req.method === 'PUT' || req.method === 'PATCH' || req.method === 'DELETE') {
        id = req.params.id

        User.findOne({username: req.user.username})
            .then(user => {
                if(user) {
                    //if client request to access 'user' resourec, check if username is same
                    if(req.baseUrl.includes('user')) {
                        if(user._id === id) {
                            next()
                        }
                        else {
                            res.status(403).json({error: `Not authorized to access the resource`})
                        }
                    }
                    else if(req.baseUrl.includes('articles')) {
                        let article = user.articles.find(x => x == req.params.id)
                        if(article) {
                            next()
                        }
                        else {
                            res.status(403).json({error: `Not authorized to access the resource`})
                        }
                    }
                }
                else {
                    res.status(400).json({error: `Bad request`})
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: `Error during authorization. Please try again.`})
            })
    }
    else {
        next()
    }
}
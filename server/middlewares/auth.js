const User = require('../models/user')
const Article = require('../models/article')
const {verify} = require('../helpers/jwt')

module.exports = {
    authenticate(req, res, next) {
        if(!req.headers.token) {
            res.status(400).json({message:'please include valid access token'})
        } else {
            const decoded = verify(req.headers.token)
            // console.log(decoded)
            User.findOne({_id:decoded._id, email:decoded.email})
            .then(found => {
                if(found) {
                    req.decoded = decoded
                    next()
                } else {
                    res.status(400).json({message:'please provide valid access token'})
                }
            })
           .catch(err => {
               res.status(500).json({message: 'error find one - middlewares'})
           })
        }
    },
    authorize(req, res, next) {
        // console.log('masuk authorize')
        // console.log(req.params.id)
        // console.log('-------')
        // console.log(req.decoded._id)
        Article.findOne({_id: req.params.id, user: req.decoded._id})
        .then(found => {
            if(found) next()
            else {
                res.status(401).json({
                    message:'Not authorized'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: 'error authorizing user'
            })
        })
    },
}
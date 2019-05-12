const jwt = require('jsonwebtoken')
const Articles = require('../models/Articles')

module.exports = (req, res, next) => {
    if(req.headers.hasOwnProperty('token')){
        const decode = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        Articles.findById(req.params.id)
        .then(found => {
            if(found){
                if(decode.id == found.author){
                    next()
                }
                else{
                    res.status(401).json({
                        error: 'not authorized'
                    })
                }
            }
            else{
                res.status(404).json({
                    error: 'post not found'
                })
            }
        }).catch(err => {
            res.status(401).json({error: "invalid signature"})
        })
    }
    else{
        res.status(401).json({
            error: 'you have to login first'
        })
    }
}
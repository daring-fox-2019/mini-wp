const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const article = require('../models/article')

module.exports = function(req,res,next){
    let id = req.decoded._id
    let articleId = req.params.id
    article
        .findById(articleId)
        .then(response=>{
            if(response.author.equals(id)){
                console.log('hi')
                next()
            }else{
                res.status(400).json('not authorized')
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json(err)
        })
}
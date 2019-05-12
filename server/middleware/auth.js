const User = require('../models/user')
const Article = require('../models/article')
const Helper = require('../helper/helper')

module.exports = {
    authenticate(req, res, next){
        if(req.headers.token){
            let decoded = Helper.decodeJWT(req.headers.token)
            req.headers.id = decoded.id
            next()
        } else {
            console.log('hehehehehehe')
            next({ message : 'Unauthenticate'})
        }
    },
    authorization(req, res, next){
        Article.findById({ _id : req.params.id})
        .then( data => {
            console.log(data)
            
            if(data){
                if(data.author == req.headers.id){
                    next()
                } else {
                    console.log('hohohohohohohoh')
                    next({ message : 'Unauthorize'})
                }
            } else {
                next({ message : 'Unauthorize'})
            }
        })
        .catch( err => {
            next(err)
        })
    },
    getAllAuth(req, res, next){
        if(req.headers.token  == 'null' || !(req.headers.token)){
            next()
        } else {
            let decoded = Helper.decodeJWT(req.headers.token)
            req.headers.id = decoded.id
            next()
        }
    }
}



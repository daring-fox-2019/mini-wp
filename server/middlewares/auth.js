const jwt = require('../helper/jwtoken')
const User = require('../model/users-mod')
const Blog = require('../model/blogs-mod')

module.exports = {
    authenticate: (req,res,next) => {
        let user = jwt.decodeToken(req.headers.auth)
        User.findOne({email: user.email})
        .then(data => {
            if(data){
                req.headers.idAuthenticated = data._id
                next()
            } else {
                res.status(401).json("please login to continue")
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
    authorUpdate: function(req,res,next){
        let idBlog = req.body.id
        Blog.findOne({_id:idBlog})
        .then(data => {
            if (data.user.toString() == req.headers.idAuthenticated.toString()){
                next()
            } else {
                throw new Error('you are not authorized to update this Blog!')
            }
        })
        .catch(err => {
            console.log(err)
            res.status(401).json(err)
        })
    },
    authorDelete: function(req,res,next){
        let idBlog = req.body.id
        Blog.findOne({_id:idBlog})
        .then(data => {
            if (data.user.toString() == req.headers.idAuthenticated.toString()){
                next()
            } else {
                throw new Error('you are not authorized to delete this Blog!')
            }
        })
        .catch(err => {
            console.log(err)
            res.status(401).json(err)
        })
    }
}

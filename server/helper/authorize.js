const Blog = require('../model/blogs-mod')

module.exports = {
    update: function(req,res){
        let idBlog = req.body.id
        Blog.findOne(idBlog)
        .then(data => {
            console.log(data.user,'a')
            console.log(req.headers.idAuthenticated,'b')
            if (data.user === req.headers.idAuthenticated){
                throw new Error('you are not authorized to update this Blog!')
            }
        })
        .catch(err => {
            console.log(err.message)
            res.status(403).json(err)
        })
    },
    delete: function(req,res){
        let idBlog = req.body.id
        Blog.findOne(idBlog)
        .then(data => {
            console.log(data.user)
            console.log(req.headers.idAuthenticated)
            if (data.user === req.headers.idAuthenticated){
                throw new Error('you are not authorized to delete this Blog!')
            }
        })
        .catch(err => {
            console.log(err.message)
            res.status(403).json(err)
        })
    }
}
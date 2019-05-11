const Blog = require('../model/blogs-mod')

module.exports = {
    update: function(req,res){
        let idBlog = req.body.id
        Blog.findOne(idBlog)
        .then(data => {
            if (data.user === req.headers.idAuthenticated){
                throw new Error('you are not authorized to update this Blog!')
            }
        })
        .catch(err => {
            res.status(403).json(err)
        })
    },
    delete: function(req,res){
        let idBlog = req.body.id
        Blog.findOne(idBlog)
        .then(data => {
            if (data.user === req.headers.idAuthenticated){
                throw new Error('you are not authorized to delete this Blog!')
            }
        })
        .catch(err => {
            res.status(403).json(err)
        })
    }
}
const jwt = require('../helper/jwtoken')
const User = require('../model/users-mod')
const Blog = require('../model/blogs-mod')

module.exports = {
    authenticate: (req,res,next) => {
        let user = jwt.decodeToken(req.headers.auth)
        User.findOneByEmail(user.email)
        .then(data => {
            if(data){
                req.headers.idAuthenticated = data._id
                next()
            } else {
                res.status(402).json("please login to continue")
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }
}
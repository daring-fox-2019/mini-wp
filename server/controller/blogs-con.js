const Blog = require('../model/blogs-mod')
const imgSavetoLocale = require('../helper/imgSavetoLocale')
const bcrypt = require('../helper/bcrypt')
const User = require('../model/users-mod')
const jwt = require('../helper/jwtoken')
const googleAuth = require('../helper/google-auth')
const authorize = require('../helper/authorize')

function showOneByEmail(email) {
    return User.findOneByEmail(email)
}

module.exports = {
    // function methods for blogs

    showAll: function (req, res) {
        console.log(req.headers.idAuthenticated)
        Blog.showAll(req.headers.idAuthenticated)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    create: function (req, res) {
        if (req.body.img) {
            imgSavetoLocale(req, res, function (title, content, createdAt, newFile, author, user) {
                Blog.create(title, content, createdAt, newFile, author, user)
                    .then(data => {
                        res.status(201).json(data)
                    })
                    .catch(err => {
                        res.status(500).json(err.message)
                    })
            })
        } else {
            let title = req.body.title
            let content = req.body.content
            let createdAt = req.body.createdAt
            let newFile = req.body.img
            let author = req.body.author
            let user = req.body.user
            Blog.create(title, content, createdAt, newFile, author, user)
                .then(data => {
                    res.status(201).json(data)
                })
                .catch(err => {
                    res.status(500).json(err.message)
                })
        }
    },
    update: function (req, res) {
        authorize.update(req,res)
        imgSavetoLocale(req, res, function (title, content, createdAt, newFile, author, user, id) {
            console.log(newFile)
            Blog.update(title, content, createdAt, newFile, author, user, id)
                .then(data => {
                    console.log(data)
                    res.status(201).json(data)
                })
                .catch(err => {
                    res.status(500).json(err.message)
                })
        })
    },
    updateOne: function (req, res) {
        authorize.update(req,res)
        if (req.body.field === 'img') {
            imgSavetoLocale(req, res, function (title, content, createdAt, newFile, author, user, id, field, value) {
                console.log(newFile)
                Blog.updateOne(title, content, createdAt, newFile, author, user, id, field, value)
                    .then(data => {
                        res.status(201).json(data)
                    })
                    .catch(err => {
                        res.status(500).json(err.message)
                    })
            })
        } else {
            let id = req.body.id
            let title = req.body.title
            let content = req.body.content
            let createdAt = req.body.createdAt
            let newFile = req.body.img
            let field = req.body.field
            let value = req.body.value
            let author = req.body.author
            let user = req.body.user
            Blog.updateOne(title, content, createdAt, newFile, author, user, id, field, value)
                .then(data => {
                    res.status(201).json(data)
                })
                .catch(err => {
                    res.status(500).json(err.message)
                })
        }
    },
    delete: function (req, res) {
        authorize.delete(req,res)
        let id = req.body.id
        Blog.delete(id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    findOne: function (req, res) {
        let id = req.body.id
        Blog.findOne(id)
            .then(data => {
                res.json(data)
            })
            .else(err => {
                res.json(err.message)
            })
    },

    // function methods for users

    showOne: function (req, res) {
        let id = req.params.id
        User.findOne(id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    showAllUser: function (req, res) {
        User.find()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    register: function (req, res) {
        let email = req.body.email
        let password = bcrypt.generateHash(req.body.password)
        let pp = req.body.pp
        User.register(email, password, pp)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    login: function (req, res) {
        if (req.body.user_google_email) {
            googleAuth(req, res)
        } else {
            let email = req.body.email
            let password = req.body.password
            showOneByEmail(email)
                .then(data => {
                    if (!data) {
                        throw new Error('your email is wrong')
                    } else {
                        if (bcrypt.checkPass(password, data.password)) {
                            let jwtoken = jwt.generateToken({
                                email: data.email,
                                _id: data._id,
                            })
                            res.status(200).json(jwtoken)
                        } else {
                            throw new Error('your password is wrong')
                        }
                    }
                })
                .catch(err => {
                    res.status(500).json({message: err})
                })
        }
    },
    updateUser: function (req, res) {
        let id = req.body.id
        let email = req.body.email
        let password = req.body.password
        let pp = req.body.pp
        User.update(id, email, password, pp)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    deleteUser: function (req, res) {
        let id = req.body.id
        User.delete(id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
}
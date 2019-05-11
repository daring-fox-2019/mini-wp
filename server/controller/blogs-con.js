const Blog = require('../model/blogs-mod')
const imgSavetoLocale = require('../helper/imgSavetoLocale')
const authorize = require('../helper/authorize')

module.exports = {
    // function methods for blogs

    showAll: function (req, res) {
        Blog.find({user: req.headers.idAuthenticated})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    create: function (req, res) {
        console.log(req.body.tags,'oooooooooooooooop')
        if (req.body.img) {
            imgSavetoLocale(req, res, function (title, content, createdAt, newFile, author, user) {
                Blog.create({title, content, createdAt, img:newFile, author, user,tags:req.body.tags})
                    .then(data => {
                        res.status(201).json(data)
                    })
                    .catch(err => {
                        console.log(err)
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
            let tags = req.body.tags
            Blog.create({title, content, createdAt, newFile, author, user,tags})
                .then(data => {
                    res.status(201).json(data)
                })
                .catch(err => {
                    res.status(500).json(err.message)
                })
        }
    },
    update: function (req, res) {
        // authorize.update(req,res)
        imgSavetoLocale(req, res, function (title, content, createdAt, newFile, author, user, id) {
            console.log(newFile)
            Blog.updateOne({_id:id},{title, content, createdAt, img:newFile, author, user, tags:req.body.tags})
                .then(data => {
                    console.log(data)
                    res.status(201).json(data)
                })
                .catch(err => {
                    console.log(err,'update')
                    res.status(500).json(err.message)
                })
        })
    },
    updateOne: function (req, res) {
        // authorize.update(req,res)
        if (req.body.field === 'img') {
            imgSavetoLocale(req, res, function (title, content, createdAt, newFile, author, user, id, field, value) {
                Blog.updateOne({_id:id},{title, content, createdAt, img:newFile, author, user, field, value})
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
            Blog.updateOne({title, content, createdAt, newFile, author, user, _id:id, field, value})
                .then(data => {
                    res.status(201).json(data)
                })
                .catch(err => {
                    res.status(500).json(err.message)
                })
        }
    },
    delete: function (req, res) {
        // authorize.delete(req,res)
        let id = req.body.id
        Blog.deleteOne({_id:id})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    findOne: function (req, res) {
        let id = req.body.id
        Blog.findOne({_id:id})
            .then(data => {
                res.json(data)
            })
            .else(err => {
                res.json(err.message)
            })
    },
    findAllbyTag(req,res){
        let tag = req.params.tag
        Blog.find({tags:tag})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },
    findAll(req,res){
        Blog.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }

    // function methods for users

   
}
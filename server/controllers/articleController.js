const Article = require('../models/article')
const ObjectId = require('mongodb').ObjectId

class ArticleController{
    static getAll(req,res){
        // console.log('masuk aa');
        Article.find({})
        .then(value =>{
            // console.log(value,'------------');
            res.status(200).json(value)
        })
        .catch(err =>{
            console.log('kok kesini');
            console.log(err);
            res.status(500).json({
                msg: `internal server error`
            })
        })
    }

    static getOne(req,res){
        let option = {_id : ObjectId(req.params.id)}
        Article.findOne(option)
        .then(value =>{
            res.status(200).json(value)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                msg: `internal server error`
            })
        })
    }

    static create(req,res){
        console.log(req.loggedUser,'ini logged user XXXX');
        let date = new Date()
        let dateFix = `${date.getFullYear()}-${date.getDate()}-${date.getMonth()}` 
        if(req.file != undefined){
            Article.create({
                title: req.body.title,
                description: req.body.description,
                author: req.body.author,
                content: req.body.content,
                created_at: new Date(),
                image : req.file.cloudStoragePublicUrl,
                userId : req.loggedUser.id
            })
            .then(newArt =>{
                res.status(200).json({
                    msg : `successfully created article`,
                    newArt
                })
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    msg: `internal server error`
                })
            })
        }else{
            Article.create({
                title: req.body.title,
                description: req.body.description,
                author: req.body.author,
                content: req.body.content,
                created_at: new Date(),
                image : '',
                userId : req.loggedUser.id
            })
            .then(newArt =>{
                res.status(200).json({
                    msg : `successfully created article`,
                    newArt
                })
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    msg: `internal server error`
                })
            })
        }
    }

    static replace(req,res){
        console.log('masuk ke replace');
        console.log(req.file);
        let option = {_id : ObjectId(req.params.id)} 
        console.log(option,'ini id update serverd');
        
        // let input = req.body
        if(req.file != undefined){
            Article.findOneAndUpdate(option,{$set : {
                title : req.body.title,
                description: req.body.description,
                author: req.body.author,
                content : req.body.content,
                image : req.file.cloudStoragePublicUrl
            }},{new: true})
            .then(article =>{
                console.log(article,'ada gambar');
                res.status(201).json(article)
            })
            .catch(err =>{
                console.log(err);
                res.status(501).json({
                    msg: `internal server error`
                })
            })
        }else{
            Article.findOneAndUpdate(option,{$set : {
                title : req.body.title,
                description: req.body.description,
                author: req.body.author,
                content : req.body.content,
            }},{new: true})
            .then(article =>{
                console.log(article,'ga ada gambar');
                
                res.status(201).json(article)
            })
            .catch(err =>{
                console.log(err);
                res.status(501).json({
                    msg: `internal server error`
                })
            })
        }
    }

    static delete(req,res){
        console.log(req.params.id)
        let option = {_id : ObjectId(req.params.id)}
        console.log(option);
        Article.findOneAndDelete(option)
        .then((article)=>{
            console.log('masuuuk');
            res.status(201).json({
                article,
                msg : `succesfully delete articles`
            })
        })
        .catch(err =>{
            console.log('salahhhh');
            
            console.log(err);
            res.status(501).json({
                msg : `internal server error`
            })
            
        })
    }

    static getMyArticles(req,res){
        Article.find({userId : req.loggedUser.id})
        .then(articles =>{
            res.status(200).json(articles)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json(err)
        })
    }


}

module.exports = ArticleController


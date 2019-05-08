const Article = require('../models/article')
const ObjectId = require('mongodb').ObjectId

class ArticleController{
    static getAll(req,res){
        Article.find({})
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
        Article.create({
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            created_at: new Date(),
            image : req.body.image
        })
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

    static replace(req,res){
        let option = {_id : ObjectId(req.params.id)}
        // let input = req.body
        Article.findOneAndUpdate(option,{$set : {
            title : req.body.title,
            description: req.body.description,
            content : req.body.content,
            image : req.body.image
        }},{new: true})
        .then(article =>{
            res.status(201).json(article)
        })
        .catch(err =>{
            console.log(err);
            res.status(501).json({
                msg: `internal server error`
            })
        })
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


}

module.exports = ArticleController
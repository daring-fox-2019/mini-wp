const Articles = require('../models/article')

class ControllerArticles{
    static getArticles(req, res){
        Articles
        .find({})
        .then(response => {
            res.status(200).json({
                response,
                msg: "Succes Get Datas"
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : "Internal Server Error"
            })
        })
    }
    static getByIdArticle(req, res){
        Articles
        .findById({
            _id: req.params.id
        })
        .then(response => {
            res.status(200).json({
                response,
                msg: "Succes Get Datas"
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : "Internal Server Error"
            })
        })
    }
    static searchArticles(req, res){
        Articles
        .find({
            title : {$regex: req.params.input}
        })
        .then(response => {
            console.log(response, 'response')
            res.status(200).json({
                response,
                msg: "Succes Get Datas"
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : "Internal Server Error"
            })
        })
    }
    static addArticle(req, res){
        Articles
        .create({
            author: req.decoded.id,
            title: req.body.title,
            content: req.body.content,
            created_at: new Date()
        })
        .then(response => {
            res.status(201).json({
                response,
                msg: "Succes Add Data"
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : "Internal Server Error"
            })
        })
    }
    static editArticle(req, res){
        Articles
        .findByIdAndUpdate({
            _id : req.params.id
        }, {
            title: req.body.title,
            content: req.body.content,
            created_at: new Date()
        })
        .then(response => {
            if(response){
                res.status(200).json({
                    response,
                    msg: "Success Edit Data"
                })
            }else{
                res.status(404).json({
                    msg: "Data Not Found, Failed Edit Data"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                msg : "Internal Server Error"
            })
        })
    }
    static deleteArticle(req, res){
        Articles
        .findByIdAndDelete({
            _id : req.params.id
        })
        .then(response => {
            if (response.deletedCount == 0){
                res.status(404).json({
                    msg: "Data Not Found, Failed Delete Data"
                })
            }else{
                res.status(200).json({
                    response,
                    msg: "Success Delete Data"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                msg : "Internal Server Error"
            })
        })
    }
}

module.exports = ControllerArticles
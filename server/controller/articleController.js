const article = require('../models/article')

class articleController{
    static findAll(req,res){
        article
            .find({})
            .then((data)=>{
                console.log(data)
                res.status(200).json(data)
            })
            .catch((err)=>{
                res.status(400).json(err)
            })
        
    }
    static create(req,res){
        let objInput = {
            title: req.body.title,
            content: req.body.content,
            created_at: req.body.created_at,
            image: req.body.image
        }
        article
            .create(objInput)
            .then((data)=>{
                res.status(200).json(data)
            })
            .catch((err)=>{
                res.status(400).json(err)
            })
    }
    static delete(req,res){
        let id = req.params.id
        article
            .findByIdAndRemove(id)
                .then( deleted => {
                    res.status(200).json({data: deleted})
                })
                .catch( err => {
                    res.status(404).json({error: err})
                })
    }


}
module.exports= articleController
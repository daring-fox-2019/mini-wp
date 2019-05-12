const articleModel = require('../models/article')
const {Translate} = require('@google-cloud/translate');


class Article{
    static postCreate(req, res, next){
        const {title, content, tags, published} = req.body
        const author = req.headers.id

        articleModel.create( {title, content, tags, author, published})
        .then( data => {
            return articleModel.findById({_id :data._id})
            .populate({path: 'author', select:['name','email']})
        })
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next(err)
        })
    }

    static getAll( req, res, next){
        let { tag, search, page, published } = req.query
        const author = req.headers.id
        
        let perPage = null
        let obj = {}

        if( tag ){
            obj = { 'tags.text': tag }
        }
        
        if( search ){ 
            search = new RegExp(`${search}`)
            obj = { $and: [{'title' :{ $regex: search , $options: 'i' }} , obj ] }
        }

        if(published){
            obj = { $and : [obj, {published}]}
        }

        if(author){
            obj = { $and : [obj, {published}, {author}]}
        }

        if(page){
            perPage = 4
        }

        articleModel.find(obj)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .populate({path: 'author', select:['name','email']})
        .sort({'updatedAt':-1})
        .then(data => {
            res.status(200).json(data)
        })
        .catch( err =>{
            console.log(err)
            next(err)
        })
    }

    static update(req, res, next){
        const { id } = req.params
        const author = req.headers.id
        const { tags, title, text, published, image} = req.body
        let content = text
        let obj = { tags, title, content, author, published, image }

        Object.keys(obj).map( el => {
            if( obj[el] == null) {
                delete obj[el]
            }
        })
        
        articleModel.findOneAndUpdate({ _id:id }, obj, {new : true})
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next(err)
        })
    }

    static deleteArticle(req, res, next){
        const {id}  = req.params

        articleModel.findOneAndDelete({_id:id})
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static translate(req, res, next){

        const translate = new Translate({
          keyFilename: './keyfile.json'
        });
        
        let { text, target} = req.body 

        console.log(text, target)
        
        translate.translate(text, target)
        .then( data => {
            res.status(200).json(data[1].data)
        })
        .catch( err => {
            next(err)
        })
    }
}

module.exports = Article
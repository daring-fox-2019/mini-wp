const Article = require('../models/article')
class ArticleController {
    static create(req,res) {
        const {title, subtitle, body, image} = req.body

        const create_obj = {title, subtitle, body, image}
        create_obj.title = 'Untitled'
        create_obj.subtitle = 'Subtitle here'
        create_obj.user = req.decoded._id
        create_obj.createdAt = new Date()
        create_obj.lastUpdate = new Date()
        create_obj.user = req.decoded._id
        create_obj.status = 'draft'
        create_obj.clap = 0;

        Article.create(create_obj)
        .then(created => {
            res.status(200).json(created)
        })
        .catch(err => {
            res.status(500).json({
                message:'error when posting new article',
                error: err.message
            })
        })
    }

    static findOne(req,res) {
        Article.findOne({_id:req.params.id})
        .populate('user')
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            //console.log('err findone article')
            res.status(500).json({
                message: 'error findone article',
                error: err.message
            })
        })
    }

    
    static findAll(req,res) {
        let query = {}
        let sort = {}
        let { tag, title, last_id, page, limit } = req.query
        let skip_data
        if( tag || title ){ 
            title = new RegExp(`${title}`) 
            tag = new RegExp(`${tag}`) 
            query = { $or: [{'title' :{ $regex: title, $options: 'i' }} ,{ 'tags.text' :{ $regex: tag , $options: 'i' }}] }
        }

        if(last_id) { //fast query
            query._id = {'$gt': last_id}
        }

        const limit_result = +limit || 5
        if(page) {
            skip_data = (page -1) * limit_result
        }
        
        
        // console.log(query)
        // console.log('----------findall query server article')
        // console.log(req.query)
        // console.log('------query')
        Article.find(query)
        .skip(skip_data)
        .limit(limit_result)
        .sort(sort)
        .populate({path: 'user', select: ['email', 'name']})
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                message:'error find all article',
                error: err.message
            })
        })
    }

    static updateOne(req,res) {
        const {title, subtitle, body, status, tags, image} = req.body
        let update_obj = {title, subtitle, body, status, tags, image}

        //loops the key, remove null or undefined ~ Object[keys]
        Object.keys(update_obj).forEach((key) => (update_obj[key] == null) && delete update_obj[key]);

        update_obj.lastUpdate = new Date()

        Article.findOneAndUpdate({_id: req.params.id}, update_obj, {new: true})
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            res.status(500).json({
                message: 'error when updating article',
                error: err.errors.article,
            })
        })
    }

    static clap(req,res) {
        let update_obj = {}
        if(req.headers.clap) {
            update_obj = {
                $push: {clap_by: req.decoded._id}, 
                //keys below will be handled in hooks
                clap: true,
                user: req.decoded._id,
            }
        } else if(req.headers.unclap) {
            update_obj = {
                $pull: {clap_by: req.decoded._id}, 
                //keys below will be handled in hooks
                clap: false,
                user: req.decoded._id,
            }
        }

        Article.findOneAndUpdate({_id: req.params.id}, update_obj, {new: true})
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            // console.log('masuk catch clap')
            // console.log(err.message)
            res.status(500).json({
                message: 'error when updating article clap',
                error: err.message,
            })
        })
    }

    static deleteOne(req,res) {
        Article.findOneAndDelete({_id: req.params.id})
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            res.status(500).json({
                messgae: ' error when deleting article',
                error: err.errors
            })
        })
    }

    static getAllUserArticle(req,res) {
        let query = {user:req.decoded._id}
        let { tag, title} = req.query
        if( tag || title ){ 
            title = new RegExp(`${title}`) 
            tag = new RegExp(`${tag}`) 
            query.$or = [{'title' :{ $regex: title , $options: 'i' }} ,{ 'tags.text' :{ $regex: tag , $options: 'i' }}]
        }
        
        // console.log(query, '<==')
        // console.log("query")
        // console.log('----------findall query server article')
        Article.find(query)
        .populate({path: 'user', select: ['email', 'name']})
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                message:'error find all article',
                error: err.message
            })
        })
    }
}
module.exports = ArticleController
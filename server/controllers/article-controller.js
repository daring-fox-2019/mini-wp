const Article = require('../models/article-model')
const Tag = require('../models/tag-model')

class ArticleController {

    static async create(req, res) {
        try {
            let {title, content, tags} = req.body
            let gcsUrl = req.file.gcsUrl
            let tagsId = [];
            let arrTags = tags.split(',')

            let allTags =  await Tag.find({})
            arrTags.forEach((tag)=> {
               const result = allTags.filter((el) => el.tagName == tag )
               tagsId.push(result[0]._id)
            })
            
            let newArticle = await Article.create({
                title, 
                content,
                photo : gcsUrl,
                userId : req.authenticatedUser.id,
                tags : tagsId
            })
                res.status(200).json({newArticle, arrTags})
          
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }

    static async showAll(req, res) {
        try {
            let articles = await Article.find().populate('userId').populate('tags')
            res.status(200).json(articles)
        } catch (error) {
            res.status(500).json(error)
        }
      
    }

    static async showOne(req, res) {
        try {
            let article = await Article.findById(req.params.id).populate('userId').populate('tags')
            res.status(200).json(article)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async update(req, res) {
       
        try {
            if (req.body.type == 'like') {
                let foundUser = await Article.findOne({ $and : [{_id : req.params.id}, { like : { $in : req.authenticatedUser.id }}]})
                if (foundUser) {
                    let deleteLike = await Article.findOneAndUpdate({ _id : req.params.id }, { $pull : { like : req.authenticatedUser.id }},{new : true})
                    res.status(200).json({ msg : 'dislike'})
                } else {
                    let updated = await Article.findByIdAndUpdate(req.params.id, { $push: { like : req.authenticatedUser.id} } )
                    res.status(200).json({ msg : 'like'})
                }
            } else {

            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async showMine(req, res) {
     
        try {   
            let articles = await Article.find({ userId : req.authenticatedUser.id }).populate('userId').populate('tags')
            res.status(200).json(articles)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async showLikes(req, res) {
        try {
            let articles = await Article.find({like : { $in : req.authenticatedUser.id}}).populate('tags')
            res.status(200).json(articles)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async delete(req, res) {
        try {
            let data = await Article.deleteOne({ _id : req.params.id })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = ArticleController
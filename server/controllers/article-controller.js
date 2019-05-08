const Article = require('../models/article-model')

class ArticleController {

    static async create(req, res) {

        let {title, content} = req.body
        let gcsUrl = req.file.gcsUrl
        
        try {
            let newArticle = await Article.create({
                title, 
                content,
                photo : gcsUrl,
                userId : req.authenticatedUser.id,
                tags : req.tags
            })

            let updateArticle = await Article.findByIdAndUpdate(newArticle._id, {
                $push: { tags : req.body.selectedTags}
            }, { new: true })

            res.status(201).json(updateArticle)
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }

    static async showAll(req, res) {
        try {
            let articles = await Article.find().populate('userId')
            res.status(200).json(articles)
        } catch (error) {
            res.status(500).json(error)
        }
      
    }

    static async showOne(req, res) {
        try {
            let article = await Article.findById(req.params.id).populate('userId')
            res.status(200).json(article)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async update(req, res) {
       
        try {
            let foundUser = await Article.findOne({ $and : [{_id : req.params.id}, { like : { $in : req.authenticatedUser.id }}]})
            if (foundUser) {
                res.status(400).json({msg : 'You already like this blogs!'})
            } else {
                let updated = await Article.findByIdAndUpdate(req.params.id, { $push: { like : req.authenticatedUser.id} } )
                res.status(200).json(updated)
            }

        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = ArticleController
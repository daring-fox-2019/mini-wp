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

}

module.exports = ArticleController
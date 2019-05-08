const Comment = require('../models/comment')
const Article = require('../models/article')

class CommentControler {
    static async addComment (req, res) {
        try {
            let newComment = await Comment.create({...req.body, userId : req.authenticatedUser.id, articleId : req.params.articleId })
            let pushedToArticle = await Article.findByIdAndUpdate(req.params.articleId, {$push : {comments : newComment._id}}, {new:true})
            res.status(201).json(newComment)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async deleteComment (req, res) {
        try {
            let foundAndDeleted = await Comment.findByIdAndDelete(req.params.id)
            if (foundAndDeleted) {
                let pushedToArticle = await Article.findByIdAndUpdate(req.params.articleId, {$pull : {comments : newComment._id}}, {new:true})
                res.status(200).json(pushedToArticle)
            } else {
                res.status(404).json({msg : 'No such comment'})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = CommentControler
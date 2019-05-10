const {Article, Tag} = require('../models')

class ArticleController {

    static async create(req,res) {
        try {
            let parsedTag = JSON.parse(req.body.tags)
            // console.log(JSON.parse(req.body.tags))
            let alltags = await Tag.find({})
            let tagListFromDb = []
            alltags.forEach(tag => {
               parsedTag.tags.forEach(userTag => { 
                  if( tag.tagName == userTag.description ) {
                      tagListFromDb.push(tag._id)
                  }
                })
            })            
            
            let url = req.file ? req.file.cloudStoragePublicUrl : '';
            let art = await Article.create({
                title : req.body.title,
                content : req.body.content,
                image : url,
                userId: req.authenticatedUser.id
            })
            let updatedTag = await Article.findByIdAndUpdate(art._id, {$set : {tags : tagListFromDb}}, {new : true})
            res.status(201).json(updatedTag)
        
        } catch (error) {
            console.log(error, 'gagal bikin atc');
            res.status(500).json(error)
        }
    }

    static async update(req, res) {
        try {
            let cloudStoragePublicUrl = ''
            if (req.file) cloudStoragePublicUrl = req.file.cloudStoragePublicUrl
            else cloudStoragePublicUrl = req.body.image

            if (req.body.type == 'like') {
                let foundArticle = await Article.findById(req.params.id)
                if (foundArticle) {
                    let checkUser = foundArticle.likes.indexOf(req.authenticatedUser.id) >= 0
                    if (checkUser) {
                        let deleteLike = await Article.findOneAndUpdate({_id : req.params.id}, {$pull : {likes : req.authenticatedUser.id}}, {new : true})
                        res.status(200).json({deleteLike, msg : "dislike"})
                    } else {
                        let okLike = await Article.findOneAndUpdate({_id : req.params.id}, {$push : {likes : req.authenticatedUser.id}}, {new : true})
                        res.status(200).json({okLike, msg : "like"})
                    }
                } else {
                    res.status(404).json({ message: `No such id exist` })
                }
            } else {
                let url = cloudStoragePublicUrl
                let foundUpdated = await Article.findOneAndUpdate({_id : req.params.id}, {$set : {...req.body}}, {new : true})
                if (foundUpdated) res.status(200).json(found)
                else res.status(404).json({ message: `No such id exist` })
            }
        } catch (error) {
            console.log(error, 'gagal update atc');
            res.status(500).json(error)
        }
    }

    static async delete(req, res) {
        try {
            let foundDeleted = Article.findOneAndDelete({ _id: req.params.id })
            if (foundDeleted) res.status(200).json(foundDeleted)
            else res.status(404).json({ message: `No such id exist` })
        } catch (error) {
            console.log(error, 'gagal delete atc');
            res.status(500).json(error)

        }
    }

    static async findOne(req, res) {
        try {
            let found = await Article.findOne({ _id: req.params.id }).populate('userId').populate('tags')
            if (found) res.status(200).json(found)
            else res.status(404).json({ message: `No such id exist` })
        } catch (error) {
            console.log(error, 'gagal findone atc');
            res.status(500).json(error)

        }
            
    }

    static async findByUser(req, res) {
        try {
            let found = await Article.find({userId : req.authenticatedUser.id}).populate('userId').populate('tags')
            if (found) res.status(200).json(found)
            else res.status(404).json({ message: `No such id exist` })
        } catch (error) {
            console.log(error, 'find by user');
           res.status(500).json(error)
    }
}

    static async findFromAllUsers(req, res) {
        try {
            let found = await Article.find({}).populate('userId')
            console.log('ap', found);
            
            if (found) res.status(200).json(found)
            else res.status(404).json({ message: `No such id exist` })

        } catch (error) {
         res.status(500).json(error)
        }
    }


     // static findAll(req, res) {
    //     let query = {}
    //     if (req.query) {
    //         let arr = []
    //         let field = Object.keys(req.query)
    //         field.forEach((keyword) => {
    //             arr.push({
    //                 [keyword]: { $regex: new RegExp(req.query[keyword], "i") }
    //             })
    //         })
    //         if (arr.length > 0) {
    //             query = { $or: arr }
    //         }
    //         // console.log(arr)
    //     }
    //     Article.find({
    //         $and : [
    //             {userId : req.authenticatedUser.id},
    //             query
    //         ]
    //     })
    //     .populate('userId')
    //     .then(articles => {
    //         res.status(200).json(articles)
    //     })
    //     .catch(err => {
    //         res.status(400).json(err)
    //     })
    // }
}


module.exports = ArticleController
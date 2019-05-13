const { wrapAsync, givesError } = require('../helpers')
const { Article } = require('../models')
const { deleteFromBucket } = require('../helpers/image-utility')
const logz = k => { console.log(`~~~~~logz~~~~~~~`); console.log(k); console.log(`~~~~~~~~~~~~~~~~~~~`) }


const functions = {
    GetHomeArticles: wrapAsync(async function (req, res) {
        let search = {}
        let articles = await Article.find(search)
        // logz(articles);
        if (articles.length > 0) res.json(articles);
        else res.status(200).json([])
    }),
    Get: wrapAsync(async function (req, res) {
        let articles = await Article.find({ author: req.user._id })
        if (articles.length > 0) res.json(articles);
        else res.status(200).json([])
    }),
    GetOne: wrapAsync(async function (req, res) {
        console.log(req.params)
        let user = await Article.findById(req.params.id)
        if (user) res.json(user)
        else res.status(200).json({})
    }),
    Post: wrapAsync(async function (req, res) {
        let { author, title, content, created_at, tags } = req.body
        let newArticle = await new Article({ author, title, content, created_at, featured_image: req.file.cloudStoragePublicUrl, tags }).save()
        if (newArticle) res.status(201).json(newArticle)
        else throw givesError(404, `article cannot be created, check your parameter`)
    }),
    Patch: wrapAsync(async function (req, res) {
        let values = { ...req.body }
        if (req.file.cloudStoragePublicUrl) { values.featured_image = req.file.cloudStoragePublicUrl }

        let toBeUpdated = await Article.findOne({ _id: req.params.id })
        if (!toBeUpdated.author.equals(req.user._id)) throw givesError(404, 'you are not author of this article')

        let updateData = await Article.findByIdAndUpdate(req.params.id, values)
        if (updateData) res.status(200).json({ updateData, msg: `data with id ${req.params.id} updated ` })
        else throw givesError(404, `data with id of ${req.params.id}`)
    }),
    Delete: wrapAsync(async function (req, res) {

        let tobeDeleted = await Article.findOne({ _id: req.params.id })
        let image = tobeDeleted.featured_image
        let fileName = image.substring(image.lastIndexOf('/'))

        if (!tobeDeleted.author.equals(req.user._id)) throw givesError(404, 'you are not author of this article')
        
        let delStatus = await Article.deleteOne({ _id: req.params.id })
        // await
        deleteFromBucket(fileName);
        // res.json({msg:`delete test`})
        if (delStatus.deletedCount == 1)
            res.status(200).json({ deletedData: delStatus, msg: ` data ${req.params.id} is deleted` })
        else if (delStatus.deletedCount == 0)
            throw givesError(404, `cannot delete, check the id`)
        else throw givesError(500, `internal server error while deleting`)
    })
}


module.exports = functions




const Articles = require("../models/Articles")
const moment = require('moment')


class articleController {

    static async getAllByUser(req, res) {
        try {
            let article = await Articles.find({
                author: req.loggedUser.id
            }).populate('author')
            res.status(200).json(article)
        } catch (err) {
            res.status(500).json({
                error: "cannot reach server"
            })
        }
    }

    static async getAllArticles(req, res) {
        try {
            let article = await Articles.find({
                status: "published"
            }).populate('author')
            res.status(200).json(article)
        } catch (error) {
            res.status(500).json({
                error: "cannot reach server"
            })
        }
    }

    static async findById(req, res) {
        try {
            let article = await Articles.findById(req.params.id).populate('author')
            if (article) res.status(200).json(article)
            else {
                res.status(400).json({
                    error: "id not found"
                })
            }
        } catch (err) {
            res.status(500).json({
                error: "cannot reach server"
            })
        }
    }

    static async create(req, res) {
        let article = new Articles({
            author: req.loggedUser.id,
            title: req.body.title,
            content: req.body.content,
            createdAt: moment().format(),
            image: req.body.image,
            status: req.body.status
        })
        try {
            let savedData = await article.save()
            res.status(200).json(savedData)
        } catch (err) {
            res.status(500).json({
                error: "cannot reach server"
            })
        }
    }

    static async put(req, res) {
        try {
            let article = await Articles.findByIdAndUpdate(req.params.id, {
                $set: {
                    author: req.loggedUser.id,
                    title: req.body.title,
                    content: req.body.content,
                    createdAt: req.body.createdAt,
                    image: req.body.image,
                }
            })
            res.status(200).json(article)
        } catch (err) {
            res.status(500).json({
                error: "cannot reach server"
            })
        }
    }

    static async patch(req, res) {
        try {
            let article = await Articles.findByIdAndUpdate(req.params.id, {
                $set: {
                    [req.body.field]: req.body.value
                }
            })
            res.status(200).json(article)
        } catch (err) {
            res.status(500).json({
                error: "cannot reach server"
            })
        }
    }

    static async delete(req, res) {
        try {
            let article = await Articles.findByIdAndDelete(req.params.id)
            res.status(200).json(article)
        } catch (err) {
            res.status(500).json({
                error: "cannot reach server"
            })
        }
    }

}

module.exports = articleController
const Tag = require('../models/tag-model')

class TagController {
    static async showAll(req, res) {
        try {
            let tags = await Tag.find({})
            res.status(200).json(tags)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async generate(req, res) {
       
        try {
            if (req.tags) {
              
                let multipleData = await req.tags.forEach(async tag => {
                    let result = await Tag.findOneAndUpdate({tagName : tag}, {}, 
                        {
                        upsert : true, new : true
                    }).exec()
                });
                res.status(201).json(req.tags)
            } else {
                let found = await Tag.findOne({tagName : req.body.tagName})
                if (!found) {
                    let created = await Tag.create({tagName : req.body.tagName})
                    res.status(201).json(created)
                } else {
                    res.status(200).json(found)
                }
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async delete(req, res) {
        try {
            let deleted = await Tag.findByIdAndDelete(req.params.id)
            res.status(200).json(deleted)
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = TagController
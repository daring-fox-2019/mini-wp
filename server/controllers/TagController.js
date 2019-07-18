
const Tag = require('../models/tag')
const Article = require('../models/article')
console.log('ad kesini ga');

class TagController {

    static async generate(req,res) {
        try {
            if (req.tags) {
                let arrTagsToShow = []
                let datadata = await req.tags.forEach( async element => {
                    
                   let hasil = await Tag.findOneAndUpdate({tagName: element}, {}, {upsert: true, new : true }).exec()
                   await console.log(hasil, '???????');
                });
                 
                res.status(201).json(req.tags)
                
            } else {
                res.status(200).json({message : 'No generated tags!'})
            }
        } catch (error) {
            res.status(500).json(error)
        }
        // console.log(req, 'dapet sini masuk ga ya')
        
    }
    
    static async create(req, res) {
        try {
            console.log('kesinis');
            
            let found = await Tag.findOne({tagName : req.body.tagName})
            console.log(found);
            if (found == null) {
               let hasil = await Tag.create({tagName : req.body.tag})
                res.status(201).json(hasil)
            } else {
                res.status(400).json({msg : 'not found!'})
            }
        } catch (error) {
            console.log(error);
            
            res.status(500).json(error)
        }
    }

}

module.exports = TagController
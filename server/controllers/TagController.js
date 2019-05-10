
const Tag = require('../models/tag')
const Article = require('../models/article')
console.log('ad kesini ga');

class TagController {

    static async generate(req,res) {
        try {
            if (req.tags) {
                let arrTagsToShow = []
                let datadata = await req.tags.forEach( async element => {
                    
                   let hasil = await Tag.findOneAndUpdate({tagName: element.description}, {}, {upsert: true, new : true }).exec()
                   await console.log(hasil, '???????');
                   await arrTagsToShow.push(hasil)
                });
                 
                res.status(201).json({tags : req.tags})
                
            } else {
                res.status(200).json({message : 'No generated tags!'})
            }
        } catch (error) {
            res.status(500).json(error)
        }
        // console.log(req, 'dapet sini masuk ga ya')
        
    }

}

module.exports = TagController
const Article = require('../models/article-model')
const Tag = require('../models/tag-model')
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');
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
            let obj = {}
            let { tag, title } = req.query
            
            if( title || tag ) {
                let data = await Tag.find({tagName : tag})
                title = new RegExp(`${title}`)
                tag = new RegExp(`${tag}`)
                obj = { $or: [{'title': {$regex: title, $options: 'i'}},{'tags': { $in : data}}]}
            } 
                let articles = await Article.find(obj).populate('userId').populate('tags')
                res.status(200).json(articles)
            

        } catch (error) {
            console.log(error);
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
              
                let {title, content, tags} = req.body
                
                let gcsUrl = ''
                if (req.file) {
                    gcsUrl = req.file.gcsUrl
                } else {
                    gcsUrl = req.body.photo
                }
                let tagsId = [];
                let arrTags = tags.split(',')
    
                let allTags =  await Tag.find({})
                arrTags.forEach((tag)=> {
                   const result = allTags.filter((el) => el.tagName == tag )
                   tagsId.push(result[0]._id)
                })
                
                let editArticle = await Article.findByIdAndUpdate(req.params.id,{
                    title, 
                    content,
                    photo : gcsUrl,
                    userId : req.authenticatedUser.id,
                    tags : tagsId
                })
                res.status(200).json(editArticle)
            }
        } catch (error) {
            console.log(error);
            
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
            let articles = await Article.find({like : { $in : req.authenticatedUser.id}}).populate('tags').populate('userId')
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

    // Imports the Google Cloud client library
    static async gSpeech(req, res) {
        try {
            const client = new textToSpeech.TextToSpeechClient();
            // The text to synthesize
            const text = req.body.content;
        
            // Construct the request
            const request = {
                input: {text: text},
                // Select the language and SSML Voice Gender (optional)
                voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
                // Select the type of audio encoding
                audioConfig: {audioEncoding: 'MP3'},
            };
        
             // Performs the Text-to-Speech request
             const [response] = await client.synthesizeSpeech(request);
             // Write the binary audio content to a local file
             const writeFile = util.promisify(fs.writeFile);
             let textToSpeech =  await writeFile('output.mp3', response.audioContent, 'binary');
                res.status(200).json(textToSpeech)
                console.log('Audio content written to file: output.mp3');
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = ArticleController
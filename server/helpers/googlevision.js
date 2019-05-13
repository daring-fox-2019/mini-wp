const vision = require('@google-cloud/vision')

const client = new vision.ImageAnnotatorClient({
    keyFilename: process.env.keyfile
});


module.exports = {

    async generate(req, res, next) {
        console.log(typeof req.tmpFile, req.tmpFile, 'ini tmp file')
        try {
            let results = await client
                .labelDetection(req.tmpFile)
            const labels = results[0].labelAnnotations;
            let allTags = []
            labels.forEach(name => {
                allTags.push(name.description)
            })
            let tags = (allTags)
            res.status(201).json({
                tags,
                deleteTmpFile: req.tmpFile
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                msg: 'internal server error.'
            })
        }
    }
}

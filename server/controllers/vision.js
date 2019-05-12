const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
    keyFilename: process.env.KEYFILE_PATH
});

class visionController {
    static generated(req, res) {
        console.log(req.file)

        client
            .labelDetection(req.file.cloudStoragePublicUrl)
            .then(results => {
                let labels = results[0].labelAnnotations;
                
                labels = labels.map(label => label.description);
                
                res.status(200).json(labels)
            })
            .catch(err => {
                console.log('Error at vision', err);
                res.status(500).json({ status: 500, message: 'error at vision', err });
            })
    }
}

module.exports = visionController
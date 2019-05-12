const vision = require('@google-cloud/vision');
// const axios = require('axios')

module.exports = function(req, res, next){

    const client = new vision.ImageAnnotatorClient({
        keyFilename: process.env.KEYFILE_PATH
    });
  
    client
    .labelDetection(req.file.cloudStoragePublicUrl)
    .then(results => {
        const labels = results[0].labelAnnotations;

        labels.forEach(el => {
            delete el.locations
            delete el.properties
            delete el.mid
            delete el.locale
            delete el.confidence
            delete el.boundingPoly
            el.text = el.description
            delete el.description
            // el.tiClasses=['ti-valid']
        })
        req.file.labels = labels
        next()
    })
    .catch(err => {
        console.error('ERROR:', err);
        console.log('error in google vision')
        next()
    });
}



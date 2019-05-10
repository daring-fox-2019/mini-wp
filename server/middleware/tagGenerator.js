const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_VISION_APIKEY 
});
console.log('hi disini tag vision generator');
module.exports = {

    generateTag  : async function (req, res, next) {
        try {
            console.log('masuk?');
            
            
            if (!req.file) {
                next()
            } else {
                const [result] = await client.labelDetection(req.file.cloudStoragePublicUrl );
                const labels = result.labelAnnotations;
                console.log('Labels:');
                labels.forEach(label => console.log(label.description));
                req.tags = labels
                next()
            }
        } catch (error) {
            console.log(error, '====== error gogole visionnnnnnn ======')
        }
    }
}
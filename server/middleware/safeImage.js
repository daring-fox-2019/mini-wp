const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_VISION_APIKEY 
});
const CLOUD_BUCKET = process.env.CLOUD_BUCKET
console.log('hi disini safe image');


module.exports = {

    safeImage  : async function (req, res, next) {
        try {
            if (!req.file.cloudStoragePublicUrl) {
                next()
            } else {
                const [result] = await client.safeSearchDetection(req.file.cloudStoragePublicUrl);
                const detections = result.safeSearchAnnotation;
                console.log('Safe search:');
                console.log(`Adult: ${detections.adult}`);
                console.log(`Spoof: ${detections.spoof}`);
                console.log(`Medical: ${detections.medical}`);
                console.log(`Violence: ${detections.violence}`);
                let arr = Object.values(detections)
                console.log(arr, 'isinya apa?');
                
                if (arr.indexOf('POSSIBLE') >=0 || arr.indexOf('LIKELY') >= 0) {
                    console.log('GAK BOLEH!!');
                    res.status(406).json({msg : 'Unsafe image detected! Cannot continue posting'})
                } else {
                    next()
                }
            }
        } catch (error) {
            console.log(error, '====== error gogole visionnnnnnn ======')
        }
    }
}
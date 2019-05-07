// Imports the Google Cloud client library
const vision = require("@google-cloud/vision");

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.CLOUD_VISION
});

module.exports = async function generateTags(req, res, next) {
  try {
    // Performs label detection on the image file
    if (req.file) {
        const [result] = await client.labelDetection(
          req.file.gcsUrl
        );

        const labels = result.labelAnnotations;
        const tags = []
        console.log("Labels:");
        labels.forEach(label => 
            tags.push(label.description));

        req.tags = tags
        next()
    } else {
        next()
    }
  } catch (error) {
    console.log(error);
  }
};

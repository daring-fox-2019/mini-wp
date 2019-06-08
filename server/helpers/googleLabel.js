// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
// const fileName = 'Local image file, e.g. /path/to/image.png';

// Performs label detection on the local file
const [result] = await client.labelDetection(fileName);
const labels = result.labelAnnotations;
console.log('Labels:');
labels.forEach(label => console.log(label.description));
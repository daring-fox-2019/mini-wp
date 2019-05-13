const { Storage } = require('@google-cloud/storage'); // Imports the Google Cloud client library
const storage = new Storage({
    keyFilename: './serviceaccount.json'
}); // Creates a client

const bucketName = 'miniwp-m43';
const bucket = storage.bucket(bucketName);

function getPublicUrl (filename) {
    return `https://storage.googleapis.com/miniwp-m43/${filename}`;
}

module.exports = (req, res, next) => {
    if (!req.file) {
      return next();
    }
    const gcsname = Date.now() + req.file.originalname;
    const file = bucket.file(gcsname);
  
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      },
      resumable: false
    });
  
    stream.on('error', (err) => {
        console.log("     Shit's broke")
        console.log(err)
        next(err);
    });
  
    stream.on('finish', () => {
        console.log(`
        Upload middleware works
        `)
        req.file.cloudStorageObject = gcsname;
        file.makePublic().then(() => {
            req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
            next();
        });
    });
  
    stream.end(req.file.buffer);
  }
const fs = require('fs')
const googleStorage = require('@google-cloud/storage')
// const gcsHelpers = require('../helpers/google-cloud-storage')

const GOOGLE_CLOUD_PROJECT_ID = "mini-wp-qfs"
const GOOGLE_CLOUD_KEYFILE = "/home/qoyyima/Documents/Hacktiv8/phase2ke2/week2/day1/mini-wp-1/server/mini-wp-qfs-c352353740cc.json"

const storage = new googleStorage.Storage({
    projectId: "mini-wp-qfs",
    keyFilename: GOOGLE_CLOUD_KEYFILE
})

getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;

const DEFAULT_BUCKET_NAME = 'mini-wp-qfs'; // Replace with the name of your bucket


module.exports = function (req, res, cb) {
    let img = req.body.img
    let extension = req.body.extension
    let base64Data = img.replace(/^data:image\/png;base64,|^data:image\/jpeg;base64,/, "");
    let newFileName = Date.now() + '.' + extension
    let newFile = '../../uploads/' + newFileName
    fs.writeFile(newFile, base64Data, 'base64', (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                msg: err,
            });
        } else {
            console.log(extension)
            req.file = {}
            req.file.buffer = fs.readFileSync(newFile)
            req.file.originalName = Date.now() + newFileName
            if (extension === 'png') {
                req.file.mimetype = 'image/png'
            } else if (extension === 'jpeg' || extension === 'jpg') {
                req.file.mimetype = 'image/jpg'
            }
            sendUploadToGCS(req, res, cb)
        }
    });
}

sendUploadToGCS = (req, res, cb) => {
    if (!req.file) {
        console.log('aaa')

        console.log('there is nothing to upload!');
        cb(title, content, createdAt, newFile, id)

    }

    const bucketName = req.body.bucketName || DEFAULT_BUCKET_NAME;
    const bucket = storage.bucket(bucketName);
    const gcsFileName = `${Date.now()}-${req.file.originalName}`;
    const file = bucket.file(gcsFileName);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
    });

    stream.on('error', (err) => {
        console.log('bbb')
        console.log(err)
        req.file.cloudStorageError = err;
        res.status(500).json(err.message);
    });

    stream.on('finish', () => {
        console.log('ccc')

        req.file.cloudStorageObject = gcsFileName;

        return file.makePublic()
            .then(() => {
                console.log('ddd')

                req.file.gcsUrl = getPublicUrl(bucketName, gcsFileName);
                console.log('Your file has been uploaded successfully!', req.file)
                let id = req.body.id
                let title = req.body.title
                let content = req.body.content
                let createdAt = req.body.createdAt
                let field = req.body.field
                let value = req.body.value
                let author = req.body.author
                let user = req.headers.idAuthenticated
                cb(title, content, createdAt, req.file.gcsUrl,  author, user, id, field, value)

            });
    });
    stream.end(req.file.buffer);
};
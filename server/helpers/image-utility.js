'use strict'
const { givesError } = require('./index')
const { Storage } = require('@google-cloud/storage')
const fs = require('fs')
const CLOUD_BUCKET = process.env.CLOUD_BUCKET
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
  console.log(Object.keys(req.file))
  console.log(JSON.stringify(req.file, null, 1))
  if (!req.file) {
    next()
  }
  if (req.body.featured_image === req.user.featured_image || !req.body.featured_image) {
    console.log(`it's either the same image, or the body request is null`)
    next()
  }

  const gcsname = `mwp-` + req.file.originalName
  console.log(`file name will be ${gcsname}`);
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    console.log('ERROR ----', err);
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      next()
    })
  })

  stream.end(req.file.buffer)
}

const Multer = require('multer'),
  multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 2 * 1024 * 1024
    },
  })

async function deleteFromBucket(fileName) {
  await storage.bucket(CLOUD_BUCKET).file(fileName).delete();
}


function fromBase64toFile(req, res, next) {
  if (!req.body.featured_image) {
    console.log(`it's either the same image, or the body request is null`)
    next()
  }
  if (req.body.featured_image === req.user.featured_image) {
    console.log(`image isn't modified yet`)
    next()
  }

  let image = req.body.featured_image
  let fileType = `png`;
  if (/^data:image\/jpeg/.test(image)) { fileType = `jpg` }

  const base64Data = image.replace(/^data:image\/png;base64,|^data:image\/jpeg;base64,/, "");
  const newFilename = Date.now() + `.${fileType}`
  fs.writeFile(newFilename, base64Data, 'base64', function (err) {
    if (err) {
      next(givesError(500, `server cannot convert this file from base64`));
    } else {
      req.file = {}
      req.file.buffer = fs.readFileSync(newFilename)
      req.file.originalName = newFilename
      req.file.mimetype = `image/${(fileType == `png`) ? `png` : `jpeg`}`
      next()
    }
  });
}

module.exports = {
  deleteFromBucket,
  fromBase64toFile,
  sendUploadToGCS,
  multer
}
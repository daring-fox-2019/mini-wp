const Post = require('../models/post')

class PostController {
  static create(req, res, next) {
    console.log("-------------" + req.body.content)
    let exclude = ['user', 'image_url', '_id', '__v', 'createdAt', 'updatedAt']
    let obj = { user: req.decoded._id, image_url: req.file.cloudStoragePublicUrl }

    Post.schema.eachPath(path => {
      if (!exclude.includes(path)) {
        if (req.body[path])
          obj[path] = req.body[path]
      }
    })

    Post.create(obj)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }

  static read(req, res, next) {
    let obj = {}
    if (req.query.title) obj.title = { '$regex': req.query.title, '$options': 'i' }

    Post.find(obj)
      .then(posts => {
        res.json(posts)
      })
      .catch(next)
  }

  static readOne(req, res, next) {
    Post.findById(req.params.id)
      .then(post => {
        res.json(post)
      })
      .catch(next)
  }

  static update(req, res, next) {
    let obj = {}
    let exclude = ['user', 'image_url', '_id', '__v', 'createdAt', 'updatedAt']

    if (req.file) {
      updated.image_url = req.file.cloudStoragePublicUrl
    }

    if (req.method === "PATCH") {
      Post.schema.eachPath(path => {
        if (!exclude.includes(path)) {
          if (req.body[path])
            obj[path] = req.body[path]
        }
      })
    }
    else {
      Post.schema.eachPath(path => {
        if (!exclude.includes(path)) {
          obj[path] = req.body[path]
        }
      })
    }

    Post.findByIdAndUpdate(req.params.id, obj, { new: true })
      .then(row => {
        res.json(row)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    Post.findByIdAndDelete(req.params.id)
      .then(row => {
        res.json(row)
      })
      .catch(next)
  }
}

module.exports = PostController
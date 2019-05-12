const Tag = require('../models/tag');

class Controller {
  static findAll(req, res, next) {
    const { search } = req.query;
    let obj = {};
    if (search) {
      obj.title = search;
    }
    Tag.find(obj, [], {
      sort:{
          created: -1
      }
    })
      .then(tags => {
        if (tags.length === 0) {
          const err = {
            status: 404,
            message: 'data empty'
          }
          next(err);
        } else {
          res.status(200).json({ message: 'data found', tags });
        }
      })
      .catch(err => {        
        next(err);
      })
  }
  
  static create(req, res, next) {
    const { title } = req.body
    
    Tag.create({
      title,
      created: new Date(),
    })
      .then(newTag => {
        res.status(201).json({ message: 'data created', newTag });
      })
      .catch(err => {
        next(err);
      })
  }
  
  static findOne(req, res, next) {
    const { id } = req.params;
    Tag.findById(id)
      .then(tag => {
        if (!tag) {
          const err = {
            status: 404,
            message: 'data not found'
          }
          next(err);
        } else {
          res.status(200).json({ message: 'data found', tag });
        }
      })
      .catch(err => {
        next(err);
      })
  }
}

module.exports = Controller;
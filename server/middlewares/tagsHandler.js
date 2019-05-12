const Tag = require('../models/tag');

module.exports = {
  async generate(req, res, next) {
    let promises = [];
    const { tags } = req.body;
    let foundTag = null;
  
    req.tags = [];
  
    for (let tag of tags) {
      foundTag = await Tag.findOne({
        title: tag
      })
      if (!foundTag) {
        promises.push(Tag.create({
          title: tag
        }))
      } else {
        req.tags.push(foundTag);
      }
    }
    let newTags = await Promise.all(promises)
    req.tags = req.tags.concat(newTags);
    next();
  }
}
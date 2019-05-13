const Tag = require('../models/tag')

module.exports = {
    tagChek(tagss) {
        console.log(tagss,'ini tagsss')
        let idTags = []
        let tags = tagss.toLowerCase().split(',')
        console.log(tags)
        tags.map(e => {
            Tag.findOne({
                name: e
            })
            .then(tag => {
                if(!tag) {
                    return Tag.create({
                        name: e
                    })
                }
            })
            .then(tag => {
                console.log(tag)

            })
            .catch(err => {
                console.log(err)
            })
        });
        return tags
    }
}
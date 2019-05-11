const route = require('express').Router()
const Tag = require('../models/tag')

route.get('/', (req, res) => {
    Tag.find()
        .then(tags => {
            res.status(200).json(tags)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
})

module.exports = route
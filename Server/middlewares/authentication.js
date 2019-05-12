const jwt = require('../helpers/jwt')
const User = require('../models/user')

module.exports = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.token, process.env.SECRET)
        User.findOne({ _id: req.decoded._id })
        next()
    } catch (err) {
        res.status(500).json(err)
    }
}
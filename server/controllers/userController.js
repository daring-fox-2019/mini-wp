const User = require('../models/user')

class UserController {

    static findOne(req, res) {
        User.findOne({username: req.user.username})
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json({error: err})
            })
    }

    static update(req, res) {
        let user = {}
        for(let key in Object.keys(req.body))
        {
            user[key] = user[key]
        }

        User.findOneAndUpdate({username: req.user.username}, user, {new: true})
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json({error: err})
            })
    }

    static delete(req, res) {
        User.findOneAndDelete({username: req.user.username})
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json({error: err})
            })
    }
}

module.exports = UserController
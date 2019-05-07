const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

module.exports = function(req, res, next) {

    if(req.headers.authorization) {
        let payload
        let username
        let password
        
        try {
            payload = jwt.verify(req.headers.authorization, process.env.SECRET)
           
            username = payload.username
            password = payload.password

            User.findOne({username: username})
            .then(user => {
                req.user = user
                next()
            })
            .catch(error => {
                res.status(403).json({error: `Invalid username`})
            })
        }
        catch(error) {
            res.status(500).json({error: `Error checking token. Please try again`})
        }
    }
    else {
        res.status(401).json({error: `Not Authorized`})
    }
}
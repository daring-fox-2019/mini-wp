const jwt = require('../helpers/jwt')
const User = require('../models/user')

module.exports = function(req, res, next) {
    if(req.headers.authorization) {
        let payload
        
        try {
            payload = jwt.verify(req.headers.authorization)
            username = payload.email

            User.findOne({email: email})
            .then(user => {
                req.user = user
                next()
            })
            .catch(error => {
                res.status(403).json(`Invalid email`)
            })
        }
        catch(error) {
            res.status(500).json(`Error checking token. Please try again`)
        }
    }
    else {
        res.status(401).json('Please login first')
    }
}
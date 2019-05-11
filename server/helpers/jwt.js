const jwt = require('jsonwebtoken')

module.exports = {
    sign: function(payload) {
        return jwt.sign(payload, process.env.SECRET)
    },
    verify: function(token) {
        try {
            let load = jwt.verify(token, process.env.SECRET)
            return load
        }
        catch(error) {
            return null
        }
    }
}
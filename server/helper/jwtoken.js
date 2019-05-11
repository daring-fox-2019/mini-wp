const jwt = require('jsonwebtoken')

module.exports = {
    generateToken: function(data){
        return jwt.sign(data, process.env.JWT_SALT)
    },
    decodeToken: function(token){
        return jwt.verify(token, process.env.JWT_SALT)
    }
}
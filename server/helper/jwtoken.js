const jwt = require('jsonwebtoken')

module.exports = {
    generateToken: function(data){
        return jwt.sign(data, process.env.JWT_SALT)
    },
    decodeToken: function(token){
        console.log(token,'opop')
        return jwt.verify(token, process.env.JWT_SALT)
    }
}
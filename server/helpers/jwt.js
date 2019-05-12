const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = {
    sign(obj) {
        return jwt.sign(obj, process.env.JWT_SECRET);
    },
    verify(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}
const jwt = require('jsonwebtoken');

module.exports = {
    sign(input) {
        const token = jwt.sign(input, process.env.JWT_SECRET) //,{expiresIn: "1h"}
        return token;
    },
    verify(token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decoded;
    }
}
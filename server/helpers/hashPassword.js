const bcrypt = require('bcryptjs');

module.exports = function(password) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}
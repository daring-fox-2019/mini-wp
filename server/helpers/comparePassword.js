const bcrypt = require('bcryptjs');

module.exports = function(password, hash) {
    return bcrypt.compareSync(password, hash)
}
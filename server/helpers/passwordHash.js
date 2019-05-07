const bcryptjs = require('bcryptjs')

module.exports = {
    getHash: function(password) {
        return bcryptjs.hashSync(password, 7)
    },
    testPassword: function(password, hash) {
        return bcryptjs.compareSync(password, hash)
    }
} 
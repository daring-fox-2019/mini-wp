const bcrypt = require('bcryptjs');

module.exports = {
    encrypt(pass) {
        return bcrypt.hashSync(pass, 10);
    },
    decrypt(pass, hash) {
        return bcrypt.compareSync(pass, hash);
    }
}
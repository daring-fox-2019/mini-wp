const bcrypt = require('bcrypt')

module.exports = {
  generateHash(password) {
    return bcrypt.hashSync(password, 10);
  },
  comparePass(inputPass, databasePass) {
    return bcrypt.compareSync(inputPass, databasePass)
  }
}
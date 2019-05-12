const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(8);

module.exports = {
  compareSync: function(password, hash) {
    return bcrypt.compareSync(password, hash);
  },

  hashSync: function(password) {
    return bcrypt.hashSync(password, salt);
  },

  genSaltSync: function(num) {
    return bcrypt.genSaltSync(num);
  }
}
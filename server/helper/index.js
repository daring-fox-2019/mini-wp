const bcrypt = require('bcrypt');


let helper = {
  generateHash: function (myPlaintextPassword) {
    var salt = bcrypt.genSaltSync(8);
    var hash = bcrypt.hashSync(myPlaintextPassword, salt);

    return hash
  },
  compareHash : function(myPlaintextPassword,hash){
    return bcrypt.compareSync(myPlaintextPassword, hash);
  }
}


module.exports = helper
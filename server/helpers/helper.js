const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  hashPass(pass) {
    return bcrypt.hashSync(pass, +process.env.SALT);
  },
  generateJWT(obj) {
    console.log('generating JWT')
    return jwt.sign(
      { name: obj.name, email: obj.email, id: obj.id },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  },
  compareHash(pass, passDB) {
    return bcrypt.compareSync(pass, passDB);
  },
  decodeJWT(token) {
    try {
      return jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
      throw new Error(err.message);
    }
  }
};



const { decodeJWT } = require("../helpers/helper");
const { User } = require("../models");

module.exports = {
  Authentication: function(req, res, next) {
    console.log("authenticating")
    let decode = decodeJWT(req.headers.token);
    if (decode) {
      User.findOne({ email: decode.email })
        .then(user => {
          if (user) {
            next();
          } else {
            res.status(404).json({
              msg: "Email not found"
            });
          }
        })
        .catch(err => {
          res.status(500).json({
            msg: err.message
          });
        });
    } else {
      res.status(400).json({
        msg: "Token is not valid"
      });
    }
  }
};

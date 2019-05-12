const { decodeJWT } = require("../helpers/helper");
const { User, Article } = require("../models");

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
      console.log("haahhahh")
      res.status(400).json({
        msg: "Token is not valid"
      });
    }
  },
  Authorization: function(req,res,next){
    let decode = decodeJWT(req.headers.token)
    Article.findOne({_id: req.body.id})
    .then(article=>{
      if (article.author == decode.id){
        next()
      }else{
        res.status(401).json({
          msg: "Not authorized"
        })
      }
    })
  }
};

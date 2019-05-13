const User = require("../models/user");
const Article = require("../models/article");
const jwt = require("../helpers/jwt-helper");

module.exports = {
  authentication: function (req, res, next) {
    try {
      // console.log("authentication");
      req.authenticatedUser = jwt.verify(req.headers.token);
      // console.log(req.authenticatedUser);

      User.findById(req.authenticatedUser.id)
        .then((user) => {
          if (user) {
            // console.log(user);
            next();
          } else {
            res.status(401).json({ message: "You need to login first" });
          }
        })
        .catch((err) => {
          next(err);
        });

    } catch (err) {
      console.log(err)
      res.status(401).json({ message: "You need to login first" });
    }
  },

  authorization: function (req, res, next) {
    // console.log("authorization");
    // console.log(req.params);

    Article.findOne({ _id: req.params.id })
      .then((article) => {
        if (String(article.userId) === req.authenticatedUser.id) {
          next();
        } else {
          res.status(401).json({ message: "You have no access to do that" });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}
const bcrypt = require("../helpers/bcryptjs-helper");
const jwt = require("../helpers/jwt-helper");
const User = require("../models/user");

class UserController {
  static createUser(req, res, next) {
    const { username, fullName, password } = req.body;
    User.create({ username, fullName, password })
      .then((user) => {
        const userData = {
          id: user._id,
          username: user.username,
          fullName: user.fullName
        };

        const token = jwt.sign(userData);
        res.status(201).json({ username: user.username, fullName: user.fullName, token });
      })
      .catch((err) => {
        next(err);
      });
  }

  static login(req, res, next) {
    // console.log(req.params);
    console.log(req.body);
    console.log(req.headers);
    User.findOne({ username: req.body.username.toLowerCase() })
      .then((user) => {
        if (!user) {
          const err = { status: 401, message: "Wrong username/password" };
          next(err);
          return;
        }

        const loggedIn = bcrypt.compareSync(req.body.password, user.password);
        if (!loggedIn) {
          const err = { status: 401, message: "Wrong username/password" };
          next(err);
          return;
        }

        const userData = {
          id: user._id,
          username: user.username,
          fullName: user.fullName
        };

        const token = jwt.sign(userData);
        res.status(200).json({ username: user.username, fullName: user.fullName, token });
      })
      .catch((err) => {
        next(err);
      });
  }

  static googleLogin(req, res, next) {
    const { OAuth2Client } = require("google-auth-library");
    const CLIENT_ID = process.env.CLIENT_ID;
    const client = new OAuth2Client(CLIENT_ID);
    const token = req.headers.token;

    // console.log("REQ HEADERS")
    // console.log(req.headers);

    client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
      .then(ticket => {
        const payload = ticket.getPayload();
        const userid = payload["sub"];
        // If request specified a G Suite domain:
        //const domain = payload['hd'];

        // console.log(payload);
        // console.log(userid);

        User.findOne({ username: payload.email })
          .then(data => {
            if (!data) {
              console.log("create")
              User.create({
                username: payload.email,
                fullName: payload.name,
                password: bcrypt.genSaltSync(8),
              })
                .then(user => {
                  console.log("sukses");
                  console.log(user);
                  const googleToken = jwt.sign({
                    id: user._id,
                    username: user.username,
                    fullName: payload.name,
                  });

                  res.status(201).json({
                    username: user.username,
                    fullName: user.fullName,
                    token: googleToken,
                  })
                })

            } else {
              console.log("udah ada")
              console.log(data);

              const googleToken = jwt.sign({
                id: data._id,
                username: data.username,
                fullName: data.fullName,
              });

              console.log(googleToken);
              req.headers.token = googleToken;

              res.status(201).json({
                username: data.username,
                fullName: data.fullName,
                token: googleToken,
              })
            }
          })

          .catch(err => {
            next(err);
          });
      })
  }
}

module.exports = UserController;
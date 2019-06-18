const User = require('../models/user');
const { decrypt, sign, passwordGenerator, client, CLIENT_ID } = require('../helpers');

class AuthController {
    static register(req, res, next) {
        User
            .create(req.body)
            .then(newUser => {
                res
                    .status(201)
                    .json(newUser);
            })
            .catch(err => {
                console.log(err)
                if (err.message === 'Email has been taken') {
                    res
                        .status(409)
                        .json({
                            message: err.message
                        })
                } else if (RegExp('validation').test(err.message)) {
                    res
                        .status(403)
                        .json({
                            message: err.message
                        })
                } else {
                    next(err);
                }
            });
    }

    static login(req, res, next) {
        User
            .findOne({
                email: req.body.email
            })
            .then(foundUser => {
                if (!foundUser) {
                    res
                        .status(404)
                        .json({
                            message: 'User not found'
                        });
                } else {
                    if (decrypt(req.body.password, foundUser.password)) {
                        const token = sign(foundUser._id, foundUser.name);

                        res
                            .status(200)
                            .json({
                                accesstoken: token
                            });
                    } else {
                        res
                            .status(401)
                            .json({
                                message: 'Wrong password'
                            });
                    }
                }
            })
            .catch(err => {
                next(err);
            });
    }

    static verify(req, res, next) {
        let payload;
        let token;

        client
            .verifyIdToken({
                idToken: req.body.token,
                audience: CLIENT_ID,
            })
            .then(ticket => {
                payload = ticket.getPayload();
                const userid = payload['sub'];

                return User.findOne({
                    email: payload.email
                })
            })
            .then(user => {
                if (!user) {
                    return User.create(
                        {
                            name: payload.name,
                            email: payload.email,
                            password: passwordGenerator()
                        }
                    );
                } else {
                    return user
                }
            })
            .then(newUser => {
                token = sign(newUser._id, newUser.name);

                res
                    .status(200)
                    .json({
                        accesstoken: token
                    });
            })
            .catch(err => {
                next(err);
            });
    }
}

module.exports = AuthController;

const User       = require('../models/user');
const Article    = require('../models/article');
const { decode } = require('../helpers');

module.exports = {
    authentication: function (req, res, next) {
        try {
            const token = req.headers.accesstoken
            if (token) {
                const decoded = decode(req.headers.accesstoken)
                req.authenticatedUser = decoded

                if (process.env.NODE_ENV === 'test') {
                    next();
                } else {
                    User
                        .findById(req.authenticatedUser._id)
                        .then(user => {
                            if (user) {
                                
                                next();
                            } else {
                                res
                                    .status(401)
                                    .json({
                                        message: 'Token is not valid'
                                    })
                            }
                        })
                        .catch(err => {
                            next(err);
                        })
                }
            } else {
                res
                    .status(401)
                    .json({
                        message: 'Please login to continue'
                    })
            }
        } catch (err) {
            res
                .status(401)
                .json({
                    message: 'Please login to continue'
                })
        }
    },

    authorization: function (req, res, next) {
        Article
            .findById(req.params.id)
            .then(article => {
                if (article) {
                    if (String(article.owner) !== req.authenticatedUser._id) {
                        res
                            .status(403)
                            .json({
                                message: 'Forbidden'
                            })
                    } else {
                        next()
                    }
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Article not found'
                        })
                }
            })
            .catch(err => {
                next(err);
            })
    }
}

const jwt = require("jsonwebtoken")
const User = require("../models/usermodel.js")
let objectId = require("mongodb").ObjectID;

module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        User.find({email: decoded.email})
        .then(users => {
            if(users.length > 0) {
                req.userData = decoded;
                next()
            }
            else {
                res.status(401).json({
                    message: "aauthentication failed"
                })
            }
        })
    }
    catch (err) {
        res.status(401).json({
            message: "authentication failed"
        });
    }
}
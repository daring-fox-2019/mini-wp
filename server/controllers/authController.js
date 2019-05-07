const User = require('../models/user')
const {getHash} = require('../helpers/passwordHash')
const {testPassword} = require('../helpers/passwordHash')
const jwt = require('../helpers/generateJWT')
const googleTokenParser = require('../helpers/googleTokenParser')

class AuthController {
    static signup(req, res) {
        let user = {}
        for(let key of Object.keys(req.body)) {
            user[key] = req.body[key]
        }
        user.password = getHash(user.password)

        User.create(user)
            .then(created => {
                res.status(201).json({data: created})
            })
            .catch(err => {
                console.log(`User create error --- ${err}`);
                res.status(500).json({error: err})
            })
    }

    static socialSignin(req, res) {
        googleTokenParser(req.body.token, function(err, miniwpToken) {
            if(err) {
                res.status(401).json({error: `Not authorized. Please try again`})
            }
            else {
                res.status(200).json({token: miniwpToken})
            }
        })
    }

    static signin(req, res) {
        console.log(`signing.....${req.body.username}, ${req.body.password}`);
        let username = req.body.username
        let password = req.body.password

        User.findOne({username: username})
            .then(user => {
                if(user && (testPassword(password, user.password))) {
                    let newToken = jwt({
                        username: user.username,
                        password: user.password,
                        email: user.email
                    })
                    
                    console.log(`logged in....`);
                    res.status(200).json({token: newToken})
                }
                else {
                    res.status(401).json({error: `Incorrect username/password`})
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err})
            })
    }
}

module.exports = AuthController
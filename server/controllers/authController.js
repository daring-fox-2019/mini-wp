const User = require('../models/user')
const {testPassword} = require('../helpers/passwordHash')
const jwt = require('../helpers/jwt')
const googleTokenParser = require('../helpers/googleTokenParser')

class AuthController {
    static signup(req, res) {
        User.create({...req.body})
            .then(created => {
                res.status(201).json(created)
            })
            .catch(err => {
                console.log(`User create error --- ${err}`);
                res.status(500).json({error: err})
            })
    }

    static googleSignIn(req, res) {
        googleTokenParser(req.body.token, function(err, miniwpToken) {
            if(err) {
                console.log(err);
                res.status(401).json(err)
            }
            else {
                res.status(200).json({token: miniwpToken})
            }
        })
    }

    static linkedinSignIn(req, res) {
        
    }

    static signin(req, res) {
        let email = req.body.email
        let password = req.body.password

        User.findOne({email: email})
            .then(user => {
                if(user && (testPassword(password, user.password))) {
                    let newToken = jwt.sign({
                        email: user.email,
                        name: user.name,
                        role: user.role
                    })

                    res.status(200).json({token: newToken})
                }
                else {
                    res.status(401).json(`Incorrect username/password`)
                }
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
}

module.exports = AuthController
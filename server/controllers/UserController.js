const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { randomizer } = require('../helpers/randomizer')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
   
    static async getOneUser(req,res) {
        try {
            let foundUser = await User.findOne({username : req.params.username})
            if (foundUser) res.status(200).json(foundUser);
            else  res.status(404).json({err : 'No such user exist'})
    
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getAllUser(req,res) {
        try {
            const users = await User.find({})
            res.status(200).json(users)
        } catch (err) {
            console.log(err, 'err bagian getalluser');
            res.status(400).json(err)
        }
    }

    static async register(req, res) {
        try {
            let url = req.file ? req.file.cloudStoragePublicUrl : '';
            const created = await User.create(
                {...req.body,
                 image : url
                })
            res.status(201).json(created)
        } catch (err) {
            console.log(err, 'bagian register');
            
            res.status(400).json(err)
        }
    }

    static async signInLocal(req, res) {
        try {
            let found = await User.findOne({email : req.body.email})
            if (found) {
                if (!bcrypt.compareSync (req.body.password, found.password)) {
                    res.status(400).json({message : 'Username/Password Invalid'})
                } else {
                    let {email, _id, username, image} = found
                    let token = jwt.sign({
                        id : _id,
                        email,
                        username
                    }, process.env.JWT_SECRET)
                    req.headers.token = token

                    res.status(200).json({token, _id, username, image})
                }
            } else {
                res.status(400).json({message : 'Username/Password Invalid'})
            }
        } catch(err) {
            console.log(err, 'bagian local login');
            res.status(400).json(err)
        }
    }

    static signInGoogle (req, res) {        
        let payload = null
        let token = null;
        console.log('sign in google')
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            payload = ticket.getPayload();
            return User.findOne({ email: payload.email })
        })
        .then((user) => {
            if (!user) {
                console.log('new acc google')
                let obj = {
                    username: payload.name,
                    email: payload.email,
                    image : payload.picture,
                    password: randomizer()
                }
                return User.create(obj)
                    .then((newUser) => {
                        token = jwt.sign({
                            id: newUser._id,
                            email: payload.email,
                            username: payload.name,
                            image : payload.picture
                        }, process.env.JWT_SECRET)

                        let {username, id, image} = newUser 
                        res.status(201).json({ token,  username, id, image})
                    })
                    .catch(err => {
                        throw err
                    })
            } else {
                console.log('member acc google')
                token = jwt.sign({ id: user._id, username: user.username, email: user.email, image : user.image },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }
                );
                let {id, image, username} = user
                
                res.status(200).json({ token, id, username, image })
            }
        })
        .catch(err => {
            console.log('ini google error')
            res.status(500).json({ err })
        })
    }
}

module.exports = UserController
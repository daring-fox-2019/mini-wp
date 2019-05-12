const User = require('../models/user-model')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class userController {
    static register(req, res) {
        const { username, email, password, image } = req.body
        let gcsUrl = ''
        if (!req.file) {
            gcsUrl = 'https://upload.wikimedia.org/wikipedia/en/d/d1/Image_not_available.png'
        } else {
            gcsUrl = req.file.gcsUrl
        }
        User
            .create({
                username,
                profilePicture : gcsUrl,
                email,
                password
            })
            .then((createdUser) => {
                res.status(200).json({ message: 'Successfully created a user!', createdUser })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static login(req, res) {

        const { email, password } = req.body
        User
            .findOne({
                email
            })
            .then((findOneUser) => {
                if (!findOneUser) res.status(401).json({ message: 'Email/Password is incorrect!' })
                else if (!compare(password, findOneUser.password)) res.status(401).json({ message: 'Email/Password is incorrect!' })
                else {
                    const { id, email, username, profilePicture } = findOneUser
                    const payload = { id, email, username, profilePicture }
                    const token = sign(payload)
                    req.headers.token = token
                    res.status(200).json({
                        message: 'You have successfully logged in!',
                        token,
                        details: payload
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static async google(req, res) {
        try {
            
            const ticket = await client.verifyIdToken({
                
                idToken: req.body.token,
                audience: process.env.CLIENT_ID,  
            });
            const payload = ticket.getPayload();
            let user = await User.findOne({ email : payload.email})
                    if (!user) {
                        let newUser = await User.create({
                            username : payload.name,
                            email: payload.email,
                            password : '12345',
                            profilePicture : payload.picture
                        })
    
                        let token = sign({
                            username : newUser.name,
                            email: newUser.email,
                            id : newUser._id,
                            profPic : newUser.profilePicture
                        }, process.env.JWT_SECRET)
                        
                        req.headers.token = token
                        res.status(201).json({id : newUser._id, token, username: newUser.username, profPic: newUser.profilePicture})
                    } else {
                       
                        let token = sign({
                            username : user.name,
                            email: user.email,
                            id : user._id ,
                            profilePicture : user.profilePicture
                        }, process.env.JWT_SECRET)
                        
                        res.status(200).json({id : user._id, token, username: user.username, profPic: user.profilePicture})
                    }
                   
            } catch (error) {
                console.log(error);
                res.status(500).json(error)
            }
    }
}

module.exports = userController

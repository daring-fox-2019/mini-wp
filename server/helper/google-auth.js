const {
    OAuth2Client
} = require('google-auth-library');
const client = new OAuth2Client(process.env.AUDIENCE_GOOGLE);
const jwt = require('./jwtoken')
const User = require('../model/users-mod')
const bcrypt = require('./bcrypt')

module.exports = function (req, res) {
    let payload
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.AUDIENCE_GOOGLE // Specify the CLIENT_ID of the app that accesses the backend

        });
        payload = ticket.getPayload();
        User.findOne({
                email: payload.email
            })
            .then(data => {
                if (data) {
                    let jwtoken = jwt.generateToken({
                        email: payload.email,
                        id: data._id
                    })
                    res.status(200).json({
                        jwtoken,
                        pp: payload.picture,
                        name: payload.name
                    })
                } else {
                    let password = bcrypt.generateHash('12345')
                    User.create({
                            email: payload.email,
                            password,
                            pp: payload.picture,
                            name: data.name
                        })
                        .then(data => {
                            let jwtoken = jwt.generateToken({
                                email: payload.email,
                                id: data._id
                            })
                            res.status(200).json({
                                jwtoken,
                                pp: payload.picture,
                                name: payload.name
                            })
                        })
                }
            })
            .catch(err => {
                console.log(err.message)
            })

    }
    verify().catch(console.error);
}
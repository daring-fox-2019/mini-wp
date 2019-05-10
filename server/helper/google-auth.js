const {
    OAuth2Client
} = require('google-auth-library');
const client = new OAuth2Client("542800123011-8mnmmf47fhbjo0v28ijvv6occajn0qvr.apps.googleusercontent.com");
const jwt = require('./jwtoken')
const User = require('../model/users-mod')
const bcrypt = require('./bcrypt')

module.exports = function (req, res) {
    let payload
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body.idToken,
            audience: "542800123011-8mnmmf47fhbjo0v28ijvv6occajn0qvr.apps.googleusercontent.com", // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        payload = ticket.getPayload();
        console.log(`ini di helper ============ ${JSON.stringify(payload.email)}`)
        const userid = payload['sub'];
        User.findOneByEmail(payload.email)
            .then(data => {
                if (data) {
                    console.log(data._id)
                    let jwtoken = jwt.generateToken({
                        email: payload.email,
                        id: data._id
                    })
                    res.status(200).json(jwtoken)
                } else {
                    let password = bcrypt.generateHash('12345')
                    User.register(payload.email, password, null)
                        .then(data => {
                            let jwtoken = jwt.generateToken({
                                email: payload.email,
                                id: data._id
                            })
                            res.status(200).json(jwtoken)
                        })
                }
            })
            .catch(err => {
                console.log(err.message)
            })
        // If request specified a G Suite domain:
        //const domain = payload['hd'];      
    }
    verify().catch(console.error);
}
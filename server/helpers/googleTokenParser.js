const {OAuth2Client} = require('google-auth-library');
const User = require('../models/user')
const jwt = require('./jwt')

module.exports = function(token, cb) {
    let access_token;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const email = payload['email'];
        const name = payload['name']

        User.findOne({email: email})
            .then(found => {
                if(found) {
                    access_token = jwt.sign({
                        name: found.name,
                        email: found.email,
                        role: found.role
                    })

                    cb(null, access_token)
                }
                else {
                    return User.create({email: email, password: process.env.DEFAULT_PWD})
                }
            })
            .then(function(created) {
                access_token = jwt.sign({
                    email: created.email,
                    name: created.name,
                    role: created.role
                })

                cb(null, access_token)
            })
    }
    verify().catch(err => {
        cb(err)
    });
}
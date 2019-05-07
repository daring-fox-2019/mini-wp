const {OAuth2Client} = require('google-auth-library');
const User = require('../models/user')
const jwt = require('./generateJWT')
const {getHash} = require('./passwordHash')

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

        User.findOne({username: email})
            .then(found => {
                if(found) {
                    access_token = jwt({
                        username: found.username,
                        password: found.password,
                        email: found.email
                    })
                    cb(null, access_token)
                }
                else {
                    return User.create({username: email, password: getHash('pass123'), email: email})
                }
            })
            .then(function(created) {
                //if new user, we set default username and password
                access_token = jwt({
                    username: created.username,
                    password: created.password,
                    email: created.email
                })

                cb(null, access_token)
            })
    }
    verify().catch(err => {
        cb(err)
    });
}
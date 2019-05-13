const {verify} = require('../helpers/jwt')

module.exports = (req, res, next) => {
    if(req.headers.hasOwnProperty('token')){
        req.decoded = verify(req.headers.token)
        console.log(req.decoded, 'authen decoded')
        next()
    }
    else{
        res.status(401).json({
            msg: 'you have to login first'
        })
    }
}
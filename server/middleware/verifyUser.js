

module.exports = {
    verifyUser( req, res, next) {
        if (req.body.token === req.headers.token) {
            console.log('massokoksoksos')
            next()
        } else {
            res.status(400).json({message : 'You are unauthorized'})
        }
    }
}
const { verify } = require('../helpers/jwt')


module.exports = (req, res, next) => {
    const decoded = verify(req.headers.token)
    Dog
        .findOne({ _id: req.params.DogId })
        .populate('UserId')
        .then((findOneDog) => {
            if (findOneDog.UserId.email === decoded.email) next()
            else res.status(401).json({ type: 'AUTHORIZATION ERROR', message: 'You do not have access to this page!' })
        })
}
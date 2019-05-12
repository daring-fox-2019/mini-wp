const { verify } = require('../helpers/jwt');
const { User } = require('../models');
const { Article } = require('../models');

module.exports = {
  authenticate: function(req, res, next) {
    let token = req.headers.token;
    if (!token) {
      res.status(400).json({ error: 'You must login to access this endpoint' });
    } else {
      let decoded = verify(token);
       User.findOne({
         email: decoded.email
       })
       .then(user => {
         if(user) {
           req.user = user;
           next();
         } else {
           res.status(404).json({ error: 'User is not valid' });
         }
       })
       .catch(err => {
         res.status(500).json(err)
       })
    }
  },
  authorize: function(req, res, next) {
    let id = req.params.id
    Article.findOne({ _id : id })
    .then(data =>{
      if(data.author == req.user._id){
        next()
      }else {
        res.status(401).json({err : 'Unauthorized'})
      }
    })
    .catch(err=>{
       res.status(500).json(err)
    })
  },
}

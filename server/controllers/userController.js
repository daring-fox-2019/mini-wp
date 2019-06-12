const User = require('../models/user')
const ObjectID = require('mongodb').ObjectID
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')


class userController{
    static getAll(req,res){
            User.find({})
            .populate('articleList')
            .then(value =>{
                res.status(200).json(value)
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    msg : 'internal server error'
                })
            })
        }

    static create(req,res){
            let user = new User({
                firstName : req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            })
            user.save()
            .then(value =>[
                res.status(200).json(value)
            ])
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    msg: `internal server error`
                })
            })
        }
    
    static login(req,res){
        // console.log('masuk login');
        // console.log(req.body);
        
        User.findOne({email : req.body.email})
        .populate('articleList')
        .then(user =>{
            // console.log(user,'ccccc');
            
            if(user){
                let check = bcrypt.compareSync(req.body.password, user.password)
                if(check){
                    let payload = {
                        id : user._id,
                        email : user.email
                    }
                    let token = jwt.sign(payload, `${process.env.SECRET_KEY}`)
                    res.status(200).json({
                        msg : 'logged in',
                        token,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        id : user._id,
                        articleList : user.articleList
                    })
                }else{
                    res.status(404).json({
                        msg : 'username/password salah'
                    })
                }
            }else{
                res.status(404).json({
                    msg : 'username/password salah'
                })
            }
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                msg: 'internal server error'
                })
            })
        }

        static loginGoogle(req,res){
            console.log('kesini-masuuuuk');
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
            client.verifyIdToken({
                idToken: req.headers.id_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(ticket =>{
                // console.log(ticket);
                const payload = ticket.getPayload()
                console.log(payload,"========")
                User.findOne({email : payload.email})
                .then(user =>{
                    // console.log(user);
                    if(!user){
                        let name = payload.name.split(' ')
                        let firstName = name[0]
                        let lastName = name.slice(1).join(' ')
                        // console.log(name,firstName,lastName);
                        
                        return User.create({
                            firstName :firstName,
                            lastName: lastName,
                            email: payload.email,
                            password: '12345'
                        })
                    }else{
                        return user
                    }
                })
                .then(user =>{
                    console.log('mau buat token',user);
                    let payload = {
                        id : user._id,
                        email : user.email
                    }
                    console.log(payload,'ini google');
                    const token = jwt.sign({payload},`${process.env.SECRET_KEY}`)
                    res.status(200).json({
                        token,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        id : user._id
                    })
                })
                .catch(err =>{
                    console.log('error di mari',err);
                    
                    res.status(500).json({
                        err: err.message
                    })
                })
            })
            .catch(err =>{
                console.log('kok disini',err);
                
                res.status(500).json({
                    err: err.message
                })
            })
        } 
    }

module.exports = userController


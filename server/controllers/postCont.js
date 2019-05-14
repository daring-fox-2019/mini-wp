const Post = require('../models/post')

class PostController {
  static create(req,res){
    console.log("-------------"+req.body.content)
    Post.create({
      user: req.decoded._id,
      title: req.body.title,
      content: req.body.content,
      image_url: req.file.cloudStoragePublicUrl,
    })
    .then(result=>{
      res.status(201).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Failed to create new Post",
        err
      })
    })
  }
  static read(req,res){
    Post.find({user: req.decoded._id})
    .then(posts =>{
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to read Todos",
        err
      })
    })
  }
  static search(req,res){
    let obj = {user: req.decoded._id}
    if(req.query.title) obj.title = { '$regex' : req.query.title, '$options' : 'i' }
    Post.find(obj)
    .then(posts=>{
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to search Todos",
        err
      })
    })
  }
  static readOne(req,res){
    Post.findOne({
      user: req.decoded._id,
      _id: req.params._id
    })
    .then(post =>{
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to read Todos",
        err
      })
    })
  }
  static update(req,res){
    // Post.findById(ObjectId(req.body.id))
    // .then(result=>{
    //   // if(req.body.status == result.status) req.body.status = result.status
    //   const newcreated_at = new Date(req.body.created_at)
    //   // if(newcreated_at == result.created_at) newcreated_at = result.created_at
    //   return Post.findByIdAndUpdate(ObjectId(req.body.id),{
    //     title: req.body.title,
    //     content: req.body.content,
    //     status: req.body.status,
    //     created_at: newcreated_at,
    //   })
    // })
    Post.findByIdAndUpdate(req.params._id,{
      title: req.body.title,
      content: req.body.content,
      created_at: req.body.created_at,
      image_url: req.file.cloudStoragePublicUrl,
    })
    .then(result=>{
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to update Post",
        err
      })
    })
  }
  static delete(req,res){
    Post.deleteOne({_id: req.params._id})
    .then(result=>{
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to delete Post",
        err
      })
    })
  }
}

module.exports = PostController
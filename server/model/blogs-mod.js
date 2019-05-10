const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: Date,
    img: String,
    author: String,
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
})

const Blog = mongoose.model('Blog', blogSchema)


module.exports = {
    showAll : function (idUser){
        return Blog.find({user:idUser})
    },
    create : function (title,content,createdAt,img,author,user){
        return Blog.create({title,content,createdAt,img,author,user})
    },
    update : function (title,content,createdAt,img,author,user,id){
        console.log(id)
        return Blog.updateOne({_id:id},{title,content,createdAt,img,author,user})
    },
    updateOne: function(title, content, createdAt, newFile, id, author,user,field,value){
        return Blog.updateOne({_id:id},{[field]: value})
    },
    delete : function (id){
        return Blog.deleteOne({_id:id})
    },
    findOne: function(id){
        return Blog.findOne({_id:id})
    }

}
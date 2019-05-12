const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const routes = require('./routes')
require('dotenv').config()
app.use(cors())

mongoose.connect('mongodb://localhost/miniWP', {useNewUrlParser:true})
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',routes)


app. listen(port, function(){
console.log(`Server Start on ${port}`);
})



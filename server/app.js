const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT ||3000
const mongoose = require('mongoose')
const routes = require('./routes')
const MONGO_ATLAS = process.env.MONGO_ATLAS || 'mongodb://localhost/miniWP'
require('dotenv').config()
app.use(cors())

mongoose.connect(MONGO_ATLAS, {useNewUrlParser:true})
.then(() => {
  console.log("Connected to database!");
  })
  .catch((error) => {
  console.log(`bermasalah`);
  console.log("Connection failed!");
  console.log(error);
  })

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',routes)


app. listen(port, function(){
console.log(`Server Start on ${port}`);
})



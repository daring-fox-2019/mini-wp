require('dotenv').config({path: './.env'})
const express = require('express')
const app = express()
const port = 3000
const route = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://miniwpw:miniwp@cluster0-ucsrd.mongodb.net/test?retryWrites=true',{ useNewUrlParser : true })

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(route)
app.listen(port,() => {
  console.log(`listening on port: ${port}!`)
})
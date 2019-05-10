const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const routes = require('./routes/index')
require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mini-wp', {useNewUrlParser: true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected')
});


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/',routes)


app.listen(PORT, function(){
    console.log(`listening on ${PORT}`)
})

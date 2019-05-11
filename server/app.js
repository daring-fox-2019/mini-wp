require('dotenv').config()

const express = require('express'),
app = express(),
port = 3000, 
mongoose = require('mongoose'),
cors = require('cors'),
atlasuri = process.env.MINIWP_DB,
bodyParser = require('body-parser')

app.use(cors())

mongoose.connect(atlasuri, {useNewUrlParser : true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("berhasil connect ke cloud");
});

app.use(express.urlencoded({ extended : false }))
app.use(bodyParser.json({limit: '1mb'}));
app.use(express.json())

app.get("/", (req,res)=>{
  res.json("hai")
})

app.listen(port, ()=>{
  console.log('listening on port', port)
})


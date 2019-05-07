require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const indexRoute = require('./routes')
var mongoose = require('mongoose');

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/', indexRoute)

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // console.log(db);
  app.listen(process.env.PORT, (req,res) => {
      console.log(`SERVER ON PORT ${process.env.PORT}`);
  })
});
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const cors = require('cors')
const router = require('./routes/')
const morgan = require('morgan')
const bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost:27017/tinyWP',{useNewUrlParser:true})


app.use(cors())
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/',router)









app.listen(port,()=>{
    console.log(port)
})

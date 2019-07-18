require('dotenv').config()

const express = require('express');
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const cors = require('cors')
const routes = require('./routes')
const url = process.env.MONGO_URL
const uri = process.env.MONGO_ATLAS_URI

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
.then(() => { console.log(('====>> Yay MongoDB Conected <<====')) })
.catch(err => { console.log(err); })

app
    .use(express.json())
    .use(express.urlencoded({extended : true}))
    .use(cors())

app.use('/', routes)

app.listen(port, function() {
    console.log(`Listening on port ${port}...`)
})


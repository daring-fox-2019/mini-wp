require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const database = process.env.ATLAS_PASSWORD ? `mongodb+srv://admin:${process.env.ATLAS_PASSWORD}@cluster0-ayir7.gcp.mongodb.net/test?retryWrites=true` : `mongodb://localhost/mini-wp`
const mongoose = require('mongoose')
const cors = require("cors")
const morgan = require('morgan')

mongoose.connect(database, { 
    useNewUrlParser: true,
    useCreateIndex: true
    })
let db = mongoose.connection

db.on("error", console.error.bind(console, "Connection error!"))
db.once("open", function () {
    console.log("mongoose is connected!")
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("tiny"))

app.use('/', require('./routes/index'))

app.listen(port, () => {
    console.log(`server is running at port 3000`)
})



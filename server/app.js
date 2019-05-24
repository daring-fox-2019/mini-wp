require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const routes = require('./routes')

mongoose.connect(process.env.CONNECT_ATLAS, { useNewUrlParser: true })
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/', routes)

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})
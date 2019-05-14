require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')
const routes = require('./routes/routes')
const mongoose = require('mongoose')

const port = process.env.PORT || 3000

const DB = process.env.MONGODB_CONNECTION_URL || 'mongodb://localhost:27017/miniWP'
mongoose.connect(DB, { useNewUrlParser: true, useCreateIndex: true })
mongoose.set('useFindAndModify', false);

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())

app.use('/', routes)

app.listen(port, () => {
    console.log(`~~~You are listening to ${port} FM~~`);
    console.log(`~~~Suara musik terkini~~~`);
})
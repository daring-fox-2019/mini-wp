require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const routes = require('./routes')
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/mini-wp', {useNewUrlParser: true});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})
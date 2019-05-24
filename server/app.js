require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const routes = require('./routes')
const mongoose = require('mongoose');
const cors = require('cors')
mongoose.set('useCreateIndex', true)

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGODB_CONNECTION_URL, {useNewUrlParser: true});
// mongoose.connect('mongodb://localhost/miniwp', {useNewUrlParser: true});

app.use('/public',express.static('./public'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})

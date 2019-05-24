const express = require("express")
require('dotenv').config()
const app = express()
const cors = require('cors')
const port = process.env.PORT
const route = require('./routes/index')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/',route)

app.listen(port, ()=>{
    console.log(`listening to port: ${port}`);
})

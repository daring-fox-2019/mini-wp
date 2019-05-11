require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const userRoutes = require('./routes/user-route')
const articleRoutes = require('./routes/article-route')
const tagsRoutes = require('./routes/tag-routes')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect(`${process.env.MONGO_DB}`, { useNewUrlParser: true })
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/users', userRoutes)
app.use('/articles', articleRoutes)
app.use('/tags', tagsRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
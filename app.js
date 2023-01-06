const express = require('express')
const bodyParser = require('body-parser')
const dbConnection = require('./config/db')
const app = express()
const api = require('./routes/index')
require('dotenv').config()
const PORT = process.env.PORT || 3000
//db connection
dbConnection()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', api)






app.listen(PORT, () => {
    console.log(`listening on${PORT}`)
})

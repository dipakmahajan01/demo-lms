const mongoose = require('mongoose')
require('dotenv').config()

const dbConnection = () => {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.MONGO_URL, (error) => {
        if (error) {
            console.log(error)
        }
        console.log('db connect')
    })
}
module.exports = dbConnection
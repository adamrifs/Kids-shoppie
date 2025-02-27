const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectDB = () => mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('database connected')
    })
    .catch(err => {
        console.log(err)
    })

module.exports = connectDB
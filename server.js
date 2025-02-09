const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./Config/db.js')
const userRoutes = require('./Routes/userRoutes.js')
const productRoutes = require('./Routes/productRoutes.js')
const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(cookieParser())

connectDB()
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)


app.listen(port, () => {
    console.log(`server running succesfull on port ${port}`)
})

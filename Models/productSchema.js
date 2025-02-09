const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String },
    type: { type: String },
    description: { type: String },
    price: { type: Number },
    stock: { type: Number },
    image: { type: String }
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

module.exports = Product
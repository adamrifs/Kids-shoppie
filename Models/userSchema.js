const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }]
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User
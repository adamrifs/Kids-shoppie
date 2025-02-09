const generateToken = require("../Config/utils")
const User = require("../Models/userSchema")
const bcrypt = require('bcryptjs')

const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(500).json({ message: 'all fields required' })
        }
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(500).json({ message: 'user already exist ' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(200).json({ message: 'user signed succesfully', newUser })
        }
    } catch (error) {
        console.log(error, 'error occured on userRegister')
        res.status(500).json({ message: error.message })
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(500).json({ message: 'all fields required' })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'user not found' })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(500).json({ message: 'password not match' })
        }
        generateToken(user._id, res)
        res.status(500).json({ message: 'user login success', user })
    } catch (error) {
        console.log(error, 'error occured on userLogin')
        res.status(500).json({ message: error.message })
    }
}

const userLogout = async (req, res) => {
    try {
        res.cookie('jwt', "", { maxAge: 0 })
        res.status(200).json({ message: 'logout succesfull' })
    } catch (error) {
        console.log(error, 'error occured on userLogout')
        res.status(500).json({ message: error.message })
    }
}

const editName = async (req, res) => {
    try {
        const userId = req.user._id
        const { name } = req.body
        const user = await User.findById(userId)
        user.name = name
        await user.save()
        res.status(200).json({ message: 'username changed succesfull' })

    } catch (error) {
        console.log(error, 'error occured on editName')
        res.status(500).json({ message: error.message })
    }
}

const deleteAccount = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findByIdAndDelete(userId)
        res.status(200).json({ message: 'account deleted succesfull' })
    } catch (error) {
        console.log(error, 'error occured on deleteAccount')
        res.status(500).json({ message: error.message })
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.user._id
        const user = await User.findById(id)
        res.status(200).json({ user })
    } catch (error) {
        console.log(error, 'error occured on getUser')
        res.status(500).json({ message: error.message })
    }
}

const addToCart = async (req, res) => {
    try {
        const id = req.user._id
        const { productId, quantity } = req.body
        if (!productId) {
            return res.status(400).json({ message: 'product not found' })
        }
        const user = await User.findById(id)
        if (!user) {
            return res.status(400).json({ message: 'user not found' })
        }
        const existingProductInCart = user.cart.find((item) => item.product.toString() === productId)
        if (existingProductInCart) {
            existingProductInCart.quantity += quantity
        } else {

            user.cart.push({ product: productId, quantity: quantity })
        }
        await user.save()
        res.status(200).json({ message: 'product added to cart', cart: user.cart })
    } catch (error) {
        console.log(error, 'error occured on addToCart')
        res.status(500).json({ message: error.message })
    }
}
const deleteCart = async (req, res) => {
    try {
        const id = req.user._id
        const { productId } = req.body
        const user = await User.findById(id)
        if (!user) {
            return res.status(400).json({ message: 'user not found' })
        }
        const updatedCart = user.cart.filter((item) => item.product.toString() !== productId)
        user.cart = updatedCart
        await user.save()
        res.status(200).json({ message: 'item removed from cart', cart: user.cart })
    } catch (error) {
        console.log(error, 'error occured on deleteCart')
        res.status(500).json({ message: error.message })
    }
}
module.exports = {
    userRegister, userLogin, userLogout, editName, deleteAccount,
    addToCart, deleteCart, getUser
}
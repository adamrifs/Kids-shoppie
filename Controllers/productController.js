const Product = require('../Models/productSchema.js')

const addProduct = async (req, res) => {
    try {
        const { name, type, description, stock, price ,image } = req.body
        const products = new Product({
            name,
            type,
            description,
            stock,
            image,
            price
        })
        await products.save()
        res.status(200).json({ message: 'products saved success', products })
    } catch (error) {
        console.log(error, 'error occured on addProduct')
        res.status(500).json({ message: error.message })
    }
}

const listProducts = async (req, res) => {
    try {
        const allProducts = await Product.find()
        res.status(200).json({ message: 'products fetched succesfully', allProducts })
    } catch (error) {
        console.log(error, 'error occured on listProducts')
        res.status(500).json({ message: error.message })
    }
}
const editProduct = async (req, res) => {
    try {
        const id = req.params.id
        const { name, type, description, stock, price ,image} = req.body
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name, type, description, stock, price,image
        }, { new: true })
        await updatedProduct.save()
        res.status(200).json({ message: 'product updated succesfull', updatedProduct })
    } catch (error) {
        console.log(error, 'error occured on editproduct')
        res.status(500).json({ message: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findByIdAndDelete(id)
        res.status(200).json({ message: 'product deleted' })
    } catch (error) {
        console.log(error, 'error occured on deleteProduct')
        res.status(500).json({ message: error.message })
    }
}

module.exports = { addProduct, editProduct, deleteProduct, listProducts }
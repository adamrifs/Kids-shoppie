const express = require('express')
const { addProduct, editProduct, deleteProduct, listProducts } = require('../Controllers/productController')
const router = express.Router()

router.post('/addProduct', addProduct)
router.get('/listProducts', listProducts)
router.put('/editProduct/:id', editProduct)
router.delete('/deleteProduct/:id', deleteProduct)

module.exports = router
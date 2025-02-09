const express = require('express')
const { userRegister, userLogin, userLogout, editName, deleteAccount, addToCart, getUser, deleteCart } = require('../Controllers/userController.js')
const router = express.Router()
const protectRoute = require('../Middleware/authMiddleware.js')

router.post('/userRegister', userRegister)
router.post('/userLogin', userLogin)
router.post('/userLogout', userLogout)
router.get('/getUser', protectRoute, getUser)
router.post('/addToCart', protectRoute, addToCart)
router.delete('/deleteCart', protectRoute, deleteCart)
router.put('/editName', protectRoute, editName)
router.delete('/deleteAccount', protectRoute, deleteAccount)

module.exports = router
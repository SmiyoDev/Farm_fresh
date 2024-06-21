const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.get('/cart', cartController.getCart); // Get the current user's cart
router.post('/cart', cartController.addItemToCart); // Add an item to the cart
router.put('/cart/:id', cartController.updateItemInCart); // Update an item in the cart
router.delete('/cart/:id', cartController.removeItemFromCart); // Remove an item from the cart

module.exports = router;
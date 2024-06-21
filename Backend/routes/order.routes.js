const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.post('/orders', orderController.createOrder); // Create a new order
router.get('/orders', orderController.getOrders); // Get all orders for the current user
router.get('/orders/:id', orderController.getOrderById); // Get an order by ID
router.put('/orders/:id', orderController.updateOrder); // Update an order
router.delete('/orders/:id', orderController.deleteOrder); // Delete an order

module.exports = router;
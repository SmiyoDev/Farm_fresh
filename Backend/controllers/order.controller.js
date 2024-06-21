const Order = require('../models/order.model');

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { total, status } = req.body;
    const orderId = await Order.createOrder(userId, total, status);
    res.status(201).json({ message: `Order created with ID ${orderId}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addProductToOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { productId, quantity } = req.body;
    await Order.addProductToOrder(orderId, productId, quantity);
    res.status(201).json({ message: 'Product added to order' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add more endpoints as needed
const Cart = require('../models/cart.model');

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.getCartByUserId(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addProductToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    await Cart.addProductToCart(userId, productId, quantity);
    res.status(201).json({ message: 'Product added to cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add more endpoints as needed
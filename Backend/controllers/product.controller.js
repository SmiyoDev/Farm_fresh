const { createProduct, getProducts } = require('../models/product.model');

exports.createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    await createProduct(name, price);
    res.status(201).json({ message: 'Product created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
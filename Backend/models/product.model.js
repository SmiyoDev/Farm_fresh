const { query } = require('../models/database');

const createProduct = async (name, price) => {
  await query('INSERT INTO products (name, price) VALUES (?,?)', [name, price]);
};

const getProducts = async () => {
  const products = await query('SELECT * FROM products');
  return products;
};

module.exports = { createProduct, getProducts };
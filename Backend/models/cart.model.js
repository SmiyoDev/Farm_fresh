const db = require('../config/db.config');

class Cart {
  static async getCartByUserId(userId) {
    const [rows] = await db.execute('SELECT * FROM carts WHERE user_id =?', userId);
    return rows;
  }

  static async addProductToCart(userId, productId, quantity) {
    const [result] = await db.execute('INSERT INTO carts SET?', { user_id: userId, product_id: productId, quantity });
    return result.insertId;
  }

  // Add more methods as needed
}

module.exports = Cart;
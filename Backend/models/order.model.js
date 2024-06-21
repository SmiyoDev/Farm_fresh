const db = require('../config/db.config');

class Order {
  static async createOrder(userId, total, status) {
    const [result] = await db.execute('INSERT INTO orders SET?', { user_id:userId, total, status });
    return result.insertId;
  }

  static async addProductToOrder(orderId, productId, quantity) {
    const [result] = await db.execute('INSERT INTO order_items SET?', { order_id: orderId, product_id: productId, quantity });
    return result.insertId;
  }

  // Add more methods as needed
}

module.exports = Order;
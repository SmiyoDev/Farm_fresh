const db = require('../config/db.config');

class User {
  static async getUserByEmail(email) {
    const connection = await db.getConnection();
    const [rows] = await connection.execute('SELECT * FROM users WHERE email =?', email);
    return rows[0];
  }

  static async createUser(email, password) {
    const connection = await db.getConnection();
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await connection.execute('INSERT INTO users SET?', { email, password: hashedPassword });
    return result.insertId;
  }
}

module.exports = User;
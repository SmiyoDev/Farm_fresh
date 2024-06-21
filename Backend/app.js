const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const db = require('./config/db.config');

const app = express();

const PORT = process.env.PORT || 5500;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  const connection = await db.getConnection();
  console.log('Database connection established');
});
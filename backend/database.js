const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    require: true,
    // rejectUnauthorized: false, // This disables certificate verification (not recommended for production)
  },
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

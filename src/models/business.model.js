const pool = require('../config/db');

const getAllBusinesses = async () => {
  const result = await pool.query('SELECT * FROM business');
  return result.rows;
};

module.exports = {
  getAllBusinesses,
};
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 15000, // 15 segundos
  idleTimeoutMillis: 30000,
});

pool.on('connect', () => console.log('Conectado a Supabase PostgreSQL'));
pool.on('error', (err) => console.error('Error de conexión:', err));
pool
  .query('SELECT NOW() AS current_time')
  .then((res) =>
    console.log(
      '✅ Conexión exitosa. Hora Supabase:',
      res.rows[0].current_time,
    ),
  )
  .catch((err) => console.error('❌ Error de conexión:', err));
module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};

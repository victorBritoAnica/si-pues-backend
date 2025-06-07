const { Pool } = require('pg');
require('dotenv').config(); // Carga las variables de entorno

// Conexión optimizada para Neon.tech
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 20, // Máximo de conexiones
  min: 2, // Mínimo de conexiones mantenidas
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Verificación automática
pool
  .query('SELECT NOW()')
  .then((res) =>
    console.log('✅ Conectado a Neon.tech. Hora actual:', res.rows[0].now),
  )
  .catch((err) => console.error('❌ Error de conexión:', err));

module.exports = pool;

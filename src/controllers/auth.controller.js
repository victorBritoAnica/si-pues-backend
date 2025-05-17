const db = require('../config/db');
const { generateToken } = require('../utils/jwt');
const bcrypt = require('bcryptjs');

const login = async (email, password) => {
  const { rows } = await db.query('SELECT * FROM "user" WHERE email = $1;', [
    email,
  ]);

  if (rows.length === 0) {
    throw new Error('Usuario no encontrado');
  }

  const user = rows[0];
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error('Contraseña incorrecta');
  }

  const token = generateToken(user.id);
  return { user, token };
};

const register = async (userData) => {
  const { username, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Asegúrate de que las columnas coincidan con la tabla (ej. "name" vs "username")
  const { rows } = await db.query(
    'INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, hashedPassword],
  );

  return rows[0];
};

module.exports = { login, register };

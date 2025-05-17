const { verifyToken } = require('../utils/jwt');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Autenticación requerida' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    // Verificar si el usuario aún existe en la base de datos
    const { rows } = await db.query('SELECT id FROM user WHERE id = $1', [
      decoded.id,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = authenticate;

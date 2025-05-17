const express = require('express');
require('dotenv').config();
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const businessRoutes = require('./routes/business.routes');
const authenticate = require('./middlewares/auth.jwt');

const app = express();

// Middlewares
app.use(express.json());

// Rutas públicas
app.use('/api/auth', authRoutes);

// Rutas protegidas
app.use('/api/users', authenticate, userRoutes);
app.use('/api/business', authenticate, businessRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

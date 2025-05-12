const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/user.routes');
const businessRoutes = require('./routes/business.routes');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/business', businessRoutes);
//

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
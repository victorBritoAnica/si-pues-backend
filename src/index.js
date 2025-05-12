const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/user.routes');

app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
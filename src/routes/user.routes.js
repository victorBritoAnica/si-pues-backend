// src/routes/user.routes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Ruta de usuarios funcionando');
});

module.exports = router;
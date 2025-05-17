const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authController.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = await authController.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

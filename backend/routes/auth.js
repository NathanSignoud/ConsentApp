const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email, password }); 
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    res.json({
      email: user.email,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
});

router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }

    const newUser = new User({ email, password, role });
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création' });
  }
});

module.exports = router;

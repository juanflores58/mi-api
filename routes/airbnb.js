const express = require('express');
const router = express.Router();
const Airbnb = require('../models/Airbnb');

router.post('/', async (req, res) => {
  try {
    const nuevoLugar = new Airbnb(req.body);
    await nuevoLugar.save();
    res.status(201).json(nuevoLugar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los lugares
router.get('/', async (req, res) => {
  try {
    const lugares = await Airbnb.find();
    res.json(lugares);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

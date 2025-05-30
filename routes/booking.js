const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.post('/', async (req, res) => {
  try {
    const nuevaReserva = new Booking(req.body);
    await nuevaReserva.save();
    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las reservas
router.get('/', async (req, res) => {
  try {
    const reservas = await Booking.find();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

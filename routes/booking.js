const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Crear una nueva reserva
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const resultado = await booking.save();
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las reservas
router.get('/', async (req, res) => {
  try {
    const reservas = await Booking.find(); // sin populate
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener reservas por nombre de usuario
router.get('/user/:userName', async (req, res) => {
  try {
    const { userName } = req.params;
    const reservas = await Booking.find({ userName: userName });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Obtener una reserva por ID
router.get('/:id', async (req, res) => {
  try {
    const reserva = await Booking.findById(req.params.id); // sin populate
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar una reserva
router.put('/:id', async (req, res) => {
  try {
    const reserva = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una reserva
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Reserva eliminada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

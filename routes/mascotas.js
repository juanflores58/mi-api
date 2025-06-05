const express = require('express');
const router = express.Router();
const Mascota = require('../models/Mascota');

// Crear mascota
router.post('/', async (req, res) => {
  try {
    const mascota = new Mascota(req.body);
    const resultado = await mascota.save();
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las mascotas
router.get('/', async (req, res) => {
  const mascotas = await Mascota.find().populate('usuario');
  res.json(mascotas);
});
router.get('/usuario/:usuarioId', async (req, res) => {
  try {
    const mascotas = await Mascota.find({ usuario: req.params.usuarioId });
    res.json(mascotas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener mascota por ID
router.get('/:id', async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id).populate('usuario');
    if (!mascota) return res.status(404).json({ error: 'No encontrado' });
    res.json(mascota);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar mascota
router.put('/:id', async (req, res) => {
  try {
    const mascota = await Mascota.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(mascota);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar mascota
router.delete('/:id', async (req, res) => {
  try {
    await Mascota.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Mascota eliminada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

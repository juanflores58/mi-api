const express = require('express');
const router = express.Router();
const Airbnb = require('../models/Airbnb');

// Crear un nuevo lugar
router.post('/', async (req, res) => {
  try {
    const lugar = new Airbnb(req.body);
    const resultado = await lugar.save();
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los lugares
router.get('/', async (req, res) => {
  try {
    const lugares = await Airbnb.find().populate('usuario'); // ajusta si tienes relaciones
    res.json(lugares);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un lugar por ID
router.get('/:id', async (req, res) => {
  try {
    const lugar = await Airbnb.findById(req.params.id).populate('usuario');
    if (!lugar) return res.status(404).json({ error: 'Lugar no encontrado' });
    res.json(lugar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un lugar
router.put('/:id', async (req, res) => {
  try {
    const lugar = await Airbnb.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(lugar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un lugar
router.delete('/:id', async (req, res) => {
  try {
    await Airbnb.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Lugar eliminado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
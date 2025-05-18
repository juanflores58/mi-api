const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Crear usuario
router.post('/', async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    const resultado = await usuario.save();
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'No encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

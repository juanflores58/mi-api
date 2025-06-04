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
// Ruta para login
router.post('/login', async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
      return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
    }

    // Buscar usuario por correo
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // Verificar contraseña (en texto plano, no recomendado para producción)
    if (usuario.contraseña !== contraseña) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // Login exitoso, puedes enviar lo que quieras (token, usuario, etc.)
    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        // No enviar contraseña
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
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

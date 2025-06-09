import { Router } from 'express';
import Mascota from '../models/Mascota.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Mascotas
 *   description: Gestión de mascotas
 */

/**
 * @swagger
 * /api/mascotas:
 *   post:
 *     summary: Crear una nueva mascota
 *     tags: [Mascotas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nombre: Firulais
 *               tipo: Perro
 *               edad: 3
 *               usuario: 60f5a8d8a5d2b9a2f0e3a6c7
 *     responses:
 *       201:
 *         description: Mascota creada correctamente
 *       400:
 *         description: Error al crear la mascota
 */
router.post('/', async (req, res) => {
  try {
    const mascota = new Mascota(req.body);
    const resultado = await mascota.save();
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/mascotas:
 *   get:
 *     summary: Obtener todas las mascotas
 *     tags: [Mascotas]
 *     responses:
 *       200:
 *         description: Lista de mascotas
 */
router.get('/', async (req, res) => {
  const mascotas = await Mascota.find().populate('usuario');
  res.json(mascotas);
});

/**
 * @swagger
 * /api/mascotas/usuario/{usuarioId}:
 *   get:
 *     summary: Obtener mascotas por ID de usuario
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de mascotas del usuario
 *       400:
 *         description: Error al buscar mascotas
 */
router.get('/usuario/:usuarioId', async (req, res) => {
  try {
    const mascotas = await Mascota.find({ usuario: req.params.usuarioId });
    res.json(mascotas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/mascotas/{id}:
 *   get:
 *     summary: Obtener mascota por ID
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Mascota encontrada
 *       404:
 *         description: Mascota no encontrada
 */
router.get('/:id', async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id).populate('usuario');
    if (!mascota) return res.status(404).json({ error: 'No encontrado' });
    res.json(mascota);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/mascotas/{id}:
 *   put:
 *     summary: Actualizar una mascota
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nombre: Max
 *               tipo: Gato
 *               edad: 5
 *     responses:
 *       200:
 *         description: Mascota actualizada correctamente
 *       400:
 *         description: Error al actualizar mascota
 */
router.put('/:id', async (req, res) => {
  try {
    const mascota = await Mascota.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(mascota);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/mascotas/{id}:
 *   delete:
 *     summary: Eliminar una mascota
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota a eliminar
 *     responses:
 *       200:
 *         description: Mascota eliminada correctamente
 *       400:
 *         description: Error al eliminar mascota
 */
router.delete('/:id', async (req, res) => {
  try {
    await Mascota.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Mascota eliminada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

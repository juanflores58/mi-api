import { Router } from 'express';
import Airbnb from '../models/Airbnb.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Airbnb
 *   description: Gestión de lugares estilo Airbnb
 */

/**
 * @swagger
 * /api/airbnb:
 *   post:
 *     summary: Crear un nuevo lugar
 *     tags: [Airbnb]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nombre: "Cabaña en el bosque"
 *               descripcion: "Un lugar acogedor entre los árboles"
 *               ubicacion: "San Martín, Argentina"
 *               precioPorNoche: 85
 *               usuario: 60f5a8d8a5d2b9a2f0e3a6c7
 *     responses:
 *       201:
 *         description: Lugar creado exitosamente
 *       400:
 *         description: Error al crear el lugar
 */
router.post('/', async (req, res) => {
  try {
    const lugar = new Airbnb(req.body);
    const resultado = await lugar.save();
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/airbnb:
 *   get:
 *     summary: Obtener todos los lugares
 *     tags: [Airbnb]
 *     responses:
 *       200:
 *         description: Lista de lugares disponibles
 *       500:
 *         description: Error del servidor
 */
router.get('/', async (req, res) => {
  try {
    const lugares = await Airbnb.find().populate('usuario');
    res.json(lugares);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/airbnb/{id}:
 *   get:
 *     summary: Obtener un lugar por ID
 *     tags: [Airbnb]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del lugar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información del lugar
 *       404:
 *         description: Lugar no encontrado
 *       400:
 *         description: Error al buscar el lugar
 */
router.get('/:id', async (req, res) => {
  try {
    const lugar = await Airbnb.findById(req.params.id).populate('usuario');
    if (!lugar) return res.status(404).json({ error: 'Lugar no encontrado' });
    res.json(lugar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/airbnb/{id}:
 *   put:
 *     summary: Actualizar un lugar
 *     tags: [Airbnb]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del lugar a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nombre: "Casa junto al lago"
 *               precioPorNoche: 120
 *     responses:
 *       200:
 *         description: Lugar actualizado correctamente
 *       400:
 *         description: Error al actualizar
 */
router.put('/:id', async (req, res) => {
  try {
    const lugar = await Airbnb.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(lugar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/airbnb/{id}:
 *   delete:
 *     summary: Eliminar un lugar
 *     tags: [Airbnb]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del lugar a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lugar eliminado correctamente
 *       400:
 *         description: Error al eliminar
 */
router.delete('/:id', async (req, res) => {
  try {
    await Airbnb.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Lugar eliminado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

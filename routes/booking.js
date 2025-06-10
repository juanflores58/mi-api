import { Router } from 'express';
import Booking from '../models/Booking.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Gestión de reservas
 */

/**
 * @swagger
 * /api/booking:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               fechaInicio: "2024-07-01"
 *               fechaFin: "2024-07-05"
 *               usuario: 60f5a8d8a5d2b9a2f0e3a6c7
 *               mascota: 60f5a8d8a5d2b9a2f0e3b7e8
 *     responses:
 *       201:
 *         description: Reserva creada correctamente
 *       400:
 *         description: Error al crear la reserva
 */
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const resultado = await booking.save();
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/booking:
 *   get:
 *     summary: Obtener todas las reservas
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: Lista de reservas
 *       500:
 *         description: Error del servidor
 */
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
/**
 * @swagger
 * /api/booking/{id}:
 *   get:
 *     summary: Obtener una reserva por ID
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *       404:
 *         description: Reserva no encontrada
 *       400:
 *         description: Error al buscar la reserva
 */
router.get('/:id', async (req, res) => {
  try {
    const reserva = await Booking.findById(req.params.id); // sin populate
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/booking/{id}:
 *   put:
 *     summary: Actualizar una reserva
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               fechaInicio: "2024-07-10"
 *               fechaFin: "2024-07-15"
 *     responses:
 *       200:
 *         description: Reserva actualizada correctamente
 *       400:
 *         description: Error al actualizar la reserva
 */
router.put('/:id', async (req, res) => {
  try {
    const reserva = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/booking/{id}:
 *   delete:
 *     summary: Eliminar una reserva
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva a eliminar
 *     responses:
 *       200:
 *         description: Reserva eliminada correctamente
 *       400:
 *         description: Error al eliminar la reserva
 */
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Reserva eliminada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

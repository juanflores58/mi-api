const mongoose = require('mongoose');

const mascotaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, enum: ['perro', 'gato', 'otro'], required: true },
  raza: String,
  edad: Number,
  peso: Number,
  fotoUrl: String,
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

module.exports = mongoose.model('Mascota', mascotaSchema);

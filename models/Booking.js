const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  nombreLugar: String,
  fecha: Date,
  hora: String,
  precio: Number,
  diasEstadia: Number,
  nombreUsuario: String,
  direccion: String
});

module.exports = mongoose.model('Booking', bookingSchema);

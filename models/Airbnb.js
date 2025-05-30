const mongoose = require('mongoose');

const airbnbSchema = new mongoose.Schema({
  imagen: String,
  nombreLugar: String,
  precio: Number,
  ubicacion: String,
  numeroContacto: String,
  descripcion: String,
  amenidades: [String],
  personaACargo: String
});


module.exports = mongoose.model('Airbnb', airbnbSchema);

const mongoose = require('mongoose');

const airbnbSchema = new mongoose.Schema({
  imagen: String,
  nombreLugar: String,
  precioPorNoche: Number, // nuevo campo agregado
  ubicacion: String,
  numeroContacto: String, // puede ser el celular
  descripcion: String,
  amenidades: [String],
  personaACargo: String,
  fechaPublicacion: {
    type: Date,
    default: Date.now, // se registra automáticamente al crear el documento
  },
});

module.exports = mongoose.model('Airbnb', airbnbSchema);

import mongoose from 'mongoose';

const airbnbSchema = new mongoose.Schema({
  imagen: String, // Guardar ruta, file, buffer, chatgpt
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

<<<<<<< HEAD
module.exports = mongoose.model('Airbnb', airbnbSchema);
=======

const Airbnb = mongoose.model('Airbnb', airbnbSchema);

export default Airbnb;
>>>>>>> 40d85a14371f2449ac2f3576ef5a90749972df62

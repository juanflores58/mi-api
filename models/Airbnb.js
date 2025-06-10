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


const Airbnb = mongoose.model('Airbnb', airbnbSchema);

export default Airbnb;

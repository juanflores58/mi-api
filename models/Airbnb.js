import mongoose from 'mongoose';

const airbnbSchema = new mongoose.Schema({
  imagen: String, // Guardar ruta, file, buffer, chatgpt
  nombreLugar: String,
  precio: Number,
  ubicacion: String,
  numeroContacto: String,
  descripcion: String,
  amenidades: [String],
  personaACargo: String
});


const Airbnb = mongoose.model('Airbnb', airbnbSchema);

export default Airbnb;

import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  apellido1: { type: String, required: true },
  apellido2: String,
  correo: { type: String, required: true, unique: true },
  fechaNacimiento: { type: Date, required: true },
  contraseña: { type: String, required: true },
  celular: { type: String } // nuevo campo
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario ;

import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  nombreLugar: String,
  fecha: Date,
  hora: String,
  precio: Number,
  diasEstadia: Number,
  idUser: String,
  nombreUsuario: String,
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
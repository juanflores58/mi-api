const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const usuariosRoutes = require('./routes/usuarios');
const mascotasRoutes = require('./routes/mascotas');
const bookingRoutes = require('./routes/booking');
const airbnbRoutes = require('./routes/airbnb');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/mascotas', mascotasRoutes);
app.use('/booking', bookingRoutes);
app.use('/airbnb', airbnbRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

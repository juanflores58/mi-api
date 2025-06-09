// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

// Rutas
import usuariosRoutes from './routes/usuarios.js';
import mascotasRoutes from './routes/mascotas.js';
import bookingRoutes from './routes/booking.js';
import airbnbRoutes from './routes/airbnb.js';

// Configurar entorno
dotenv.config();

const app = express();
<<<<<<< HEAD
app.use(express.json());
const cors = require('cors');
=======
const PORT = process.env.PORT || 3001;

// Middlewares
>>>>>>> 40d85a14371f2449ac2f3576ef5a90749972df62
app.use(cors());
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/mascotas', mascotasRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/airbnb', airbnbRoutes);

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
<<<<<<< HEAD
}).then(() => console.log('✅ Conectado a MongoDB')).catch(err => console.error('❌ Error conectando a MongoDB:', err));
=======
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch((error) => console.error('❌ Error al conectar a MongoDB:', error));
>>>>>>> 40d85a14371f2449ac2f3576ef5a90749972df62

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Documentación Swagger en http://localhost:${PORT}/api-docs`);
});

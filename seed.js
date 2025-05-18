const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Usuario = require('./models/Usuario');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("✅ Conectado a MongoDB");

  const usuarios = [
    { nombre: "Ana Pérez", email: "ana@example.com", edad: 28 },
    { nombre: "Carlos Ruiz", email: "carlos@example.com", edad: 35 },
    { nombre: "Lucía Gómez", email: "lucia@example.com", edad: 22 }
  ];

  await Usuario.deleteMany({});
  await Usuario.insertMany(usuarios);
  console.log("🌱 Datos insertados correctamente");

  mongoose.disconnect();
}).catch(err => {
  console.error("❌ Error al conectar o insertar:", err);
});

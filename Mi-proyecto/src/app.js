const express = require('express'); // Importa Express
const cors = require('cors'); // Importa CORS para permitir peticiones cruzadas
const app = express(); // Crea la aplicación

app.use(express.json()); // Habilita el uso de JSON
app.use(cors()); // Habilita CORS

// Importa rutas
const userRoutes = require('./routes/user.routes'); // Rutas de usuarios
const authRoutes = require('./routes/auth.routes'); // Rutas de autenticación
const projectRoutes = require('./routes/project.routes'); // Rutas de proyectos

// Usa rutas con prefijo /api/v1
app.use('/api/v1', userRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', projectRoutes);

module.exports = app; // Exporta la aplicación
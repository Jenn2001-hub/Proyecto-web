const express = require('express');
const cors = require('cors'); //habilita el acceso a la API
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Middleware para parsear JSON (debe estar antes de las rutas)
app.use(express.json());
app.use(cors());

// Definir las rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// Ruta por defecto para la raíz
app.get('/', (req, res) => {
  res.status(200).json('Bienvenido a la API de Gestión de Proyectos');
});

// manejo de errores
app.use(errorHandler);

module.exports = app;